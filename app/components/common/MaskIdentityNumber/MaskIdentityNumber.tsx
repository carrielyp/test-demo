import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState
} from "react";
import { Spin } from "../Spin";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import { maskIdentityNumber } from "../../../utils/generalUtil";
import { Eye, EyeSlash } from "../Icon";

export interface MaskIdentityNumberProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  identificationNum: string;
  hideIcon?: boolean;
  masked?: boolean;
  onUnmask?: () => Promise<string>;
  renderUnmasked?: (identityNum: string) => void;
  onMaskedChanged?: (masked: boolean) => void;
}

export const MaskIdentityNumber = ({
  identificationNum,
  className,
  hideIcon,
  masked,
  onUnmask,
  onMaskedChanged,
  renderUnmasked,
  ...props
}: MaskIdentityNumberProps) => {
  const [internalMasked, setInternalMasked] = useState(
    masked === null || masked === undefined ? true : masked
  );
  const [unmaskedIdentity, setUnmaskedIdentity] = useState<string>();
  const [loading, setLoading] = useState(false);

  useUpdateEffect(() => {
    if (masked !== null && masked !== undefined) {
      setInternalMasked(masked);
    }
  }, [masked]);

  useUpdateEffect(() => {
    if (internalMasked !== masked) {
      onMaskedChanged?.(internalMasked || false);
    }
  }, [internalMasked]);

  useEffect(() => {
    if (!internalMasked) {
      internalOnUnmask();
    }
  }, [internalMasked]);

  const internalOnUnmask = async () => {
    if (!onUnmask || unmaskedIdentity) {
      return;
    }

    setLoading(true);

    // function to api call
    try {
      const unmaskedIdentity = await onUnmask();

      setUnmaskedIdentity(unmaskedIdentity);
    } catch (err) {}

    setLoading(false);
  };

  const toggle = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.cancelable = true;
    e.stopPropagation();

    setInternalMasked(!internalMasked);
  };

  return (
    <div
      className={`
        flex h-6 items-center space-x-2
        ${props.onClick ? "cursor-pointer text-neutral-50" : ""}
        ${className || ""}
      `}
      {...props}
    >
      <span>
        {internalMasked
          ? maskIdentityNumber(identificationNum)
          : (renderUnmasked
              ? renderUnmasked(unmaskedIdentity || identificationNum)
              : unmaskedIdentity) || identificationNum}
      </span>
      {!hideIcon && (
        <div className="mt-1">
          {loading ? (
            <Spin size="small" />
          ) : internalMasked ? (
            <Eye
              data-testid="identity-icon-eye"
              className="cursor-pointer text-neutral-50"
              onClick={toggle}
            />
          ) : (
            <EyeSlash
              data-testid="identity-icon-eyeSlash"
              className="cursor-pointer text-neutral-50"
              onClick={toggle}
            />
          )}
        </div>
      )}
    </div>
  );
};
