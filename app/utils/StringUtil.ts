import escapeHtmlLib from "escape-html";
import pluralize from "pluralize";
import sanitizeFilename from "sanitize-filename";
import shortUuid from "short-uuid";
import { DateUtil } from "./DateUtil";

interface Address {
  postalCode?: string;
  block?: string;
  street?: string;
  building?: string;
  floor?: string;
  unit?: string;
}

interface Address2 {
  block?: string;
  street?: string;
  floor?: string;
  unit?: string;
}

interface Agency {
  name: string;
  acronym?: string;
  branch?: string;
}

export class StringUtil {
  static padLeft(
    oriStr: string | null | undefined,
    length: number,
    leadingStr: string
  ) {
    if (!oriStr) {
      oriStr = "";
    }

    return oriStr.length >= length
      ? oriStr
      : new Array(length - oriStr.length + 1).join(leadingStr) + oriStr;
  }

  static padRight(
    oriStr: string | null | undefined,
    length: number,
    leadingStr: string
  ) {
    if (!oriStr) {
      oriStr = "";
    }

    return oriStr.length >= length
      ? oriStr
      : oriStr + new Array(length - oriStr.length + 1).join(leadingStr);
  }

  static replaceEmpty(str: string | null | undefined, replacement = "-") {
    if (str === null || str === undefined || str === "") {
      return replacement;
    }

    return str;
  }

  static formatAddress(address: Address) {
    let str = "";

    if (address) {
      const { postalCode, block, street, building, floor, unit } = address;

      if (floor && unit) {
        str += `#${floor}-${unit}, `;
      }

      if (block && street) {
        str += `${block} ${street}, `;
      } else if (block) {
        str += `${block}, `;
      } else if (street) {
        str += `${street}, `;
      }

      if (building) {
        str += `${building}, `;
      }

      if (postalCode) {
        str += `Singapore ${postalCode}`;
      }
    }

    return str === "" ? "-" : str;
  }

  static formatAddress2(address: Address2) {
    let str = "";

    if (address) {
      const { block, street, floor, unit } = address;

      if (block && street) {
        str += `Blk ${block} ${street}`;
      } else if (block) {
        str += `Blk ${block}`;
      } else if (street) {
        str += street;
      }

      if (floor && unit) {
        if (str) {
          str += ", ";
        }

        str += `#${floor}-${unit}`;
      }
    }

    return str === "" ? "-" : str;
  }

  static formatAddress3(address: Address) {
    let str = "";
    const strs = [] as string[];

    if (address) {
      const { postalCode, block, street, floor, unit, building } = address;

      if (building) {
        strs.push(building);
      }

      if (block && street) {
        strs.push(`${block} ${street}`);
      } else if (block) {
        strs.push(block);
      } else if (street) {
        strs.push(street);
      }

      if (floor && unit) {
        strs.push(`#${floor}-${unit}`);
      }

      str = strs.join(", ");

      if (postalCode) {
        str += `\nSingapore ${postalCode}`;
      }
    }

    return str === "" ? "-" : str;
  }

  static formatContactNumber(contactNumber: string, countryCode?: string) {
    if (contactNumber.length < 5) {
      return `${countryCode ? `${countryCode} ` : ""}${contactNumber}`;
    }

    return `${countryCode ? `${countryCode} ` : ""}${contactNumber.substring(
      0,
      4
    )} ${contactNumber.substring(4)}`;
  }

  static formatAgency(agency: Agency) {
    const { acronym, branch } = agency;
    let name = agency.name;

    if (acronym) {
      name += ` (${acronym})`;
    }

    if (branch) {
      name += ` - ${branch}`;
    }

    return name;
  }

  static truncate(str?: string, maxLength = 15): string {
    if (str && str.length > maxLength) {
      return `${str.substring(0, maxLength)}...`;
    }

    return str || "";
  }

  static formatFileSize(
    byte: number,
    toUnit: "auto" | "Byte" | "KB" | "MB" = "auto",
    displayUnit = true,
    decimalPlace = 2
  ): string {
    let value: number;
    let unit = "";

    if (toUnit === "MB" || (toUnit === "auto" && byte >= Math.pow(10, 6))) {
      value = byte / Math.pow(2, 20);
      unit = "MB";
    } else if (
      toUnit === "KB" ||
      (toUnit === "auto" && byte >= Math.pow(10, 3))
    ) {
      value = byte / Math.pow(2, 10);
      unit = "KB";
    } else {
      value = byte;
      unit = this.pluralize("Byte", byte, false);
    }

    value = parseFloat(value.toFixed(decimalPlace));

    return displayUnit ? `${value} ${unit}` : `${value}`;
  }

  static romanize(num: number): string {
    const digits = String(+num).split("");
    const key = [
      "",
      "c",
      "cc",
      "ccc",
      "cd",
      "d",
      "dc",
      "dcc",
      "dccc",
      "cm",
      "",
      "x",
      "xx",
      "xxx",
      "xl",
      "l",
      "lx",
      "lxx",
      "lxxx",
      "xc",
      "",
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
      "ix"
    ];
    let roman = "";
    let i = 3;

    while (i--) {
      const pop = digits.pop();

      if (pop) {
        roman = (key[+pop + i * 10] || "") + roman;
      }
    }

    return Array(+digits.join("") + 1).join("M") + roman;
  }

  static generateUuid(): string {
    return shortUuid.generate();
  }

  static pluralize(word: string, count?: number, inclusive = true) {
    return pluralize(word, count, inclusive);
  }

  static capitaliseFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  static stringifyBoolean(value: boolean) {
    if (value) {
      return "Yes";
    }

    return "No";
  }

  /**
   * This function will convert input number to ordinals. It only supports up to 99 at this point of time.
   *
   * @param num num must be 0 <= num <= 99
   * @param capitalise true to capitalize the first character
   * @returns ordinal
   */
  static toOrdinal(num: number, capitalise?: boolean) {
    if (num > 99) {
      return "";
    }

    const ordinalTh = [
      "zeroth",
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
      "tenth",
      "eleventh",
      "twelfth",
      "thirteenth",
      "fourteenth",
      "fifteenth",
      "sixteenth",
      "seventeenth",
      "eighteenth",
      "nineteenth"
    ];
    const ordinalSpecial = [
      "twent",
      "thirt",
      "fort",
      "fift",
      "sixt",
      "sevent",
      "eight",
      "ninet"
    ];

    const processFunc = capitalise
      ? StringUtil.capitaliseFirstLetter
      : (val: string) => val;

    if (num < 20) {
      return processFunc(ordinalTh[num]);
    }

    if (num % 10 === 0) {
      return processFunc(`${ordinalSpecial[Math.floor(num / 10) - 2]}ieth`);
    }

    return processFunc(
      `${ordinalSpecial[Math.floor(num / 10) - 2]}y-${ordinalTh[num % 10]}`
    );
  }

  static sanitizeFilename(filename: string, maxLength = 250) {
    filename = sanitizeFilename(filename);

    let extension!: string;
    const split = filename.split(".");

    if (split.length > 1) {
      extension = split[split.length - 1].trim();
      filename = split.slice(0, split.length - 1).join(".");
    }

    filename = filename.replace(/[^a-zA-Z0-9 &+\-_()[\]]/g, "").trim();

    if (!filename) {
      filename = "file";
    }

    if (extension) {
      maxLength = maxLength - extension.length - 1;
    }

    filename = filename.substring(0, maxLength);

    return this.generateFileName(filename, extension, false);
  }

  static formatDollars(dollars: number, symbol = true) {
    return dollars.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: symbol ? "currency" : undefined,
      currency: "USD"
    });
  }

  static formatCents(cents: number, symbol = true) {
    return this.formatDollars(cents / 100, symbol);
  }

  /**
   *
   * @param baseFileName file name without extension
   * @param extension without "." (e.g. csv, xslx, docx), if never provide will return filename without extension
   * @param addTime will add timestamp in between the file name and extension
   * @returns formatted file name (e.g. audit-report_2020102120354.csv)
   */
  static generateFileName(
    baseFileName: string,
    extension = "",
    addTime = true
  ) {
    const timestamp = addTime
      ? `_${DateUtil.toString(new Date(), "YYYYMMDDHHmmss")}`
      : "";

    return `${baseFileName}${timestamp}${extension ? `.${extension}` : ""}`;
  }

  /**
   * Mask url query data
   *
   * @param url e.g. localhost:1000/test?someVal=abcd || localhost:1000/test?someVal=abcd&anotherVal=dddd
   * @param findWords to replace the value of someVal, pass in someVal
   * @param maskWith char that will be used to replace the value with. default *****
   * @returns e.g. localhost:1000/test?someVal=***** || localhost:1000/test?someVal=*****&anotherVal=dddd
   */
  static maskUrlQueryData(
    url: string,
    findWords: string[],
    maskWith = "*****"
  ) {
    let maskedUrl = url;

    for (const findWord of findWords) {
      const startIdx = url.indexOf(`${findWord}=`);

      if (startIdx < 0) {
        continue;
      }

      let lastIdx = url.indexOf("&", startIdx);

      if (lastIdx <= 0) {
        lastIdx = url.length;
      }

      maskedUrl = maskedUrl.replace(
        url.substring(startIdx, lastIdx),
        `${findWord}=${maskWith}`
      );
    }

    return maskedUrl;
  }

  static sanitizeRegexPattern(str: string) {
    const re = /[\[\]\{\}\(\)\+\^\$\.\?\*\|\\]/g;

    return str.replace(re, "\\$&");
  }

  static andJoin(texts: string[]) {
    if (texts.length === 0) {
      return "";
    }

    if (texts.length === 1) {
      return texts[0];
    }

    return `${texts.slice(0, -1).join(", ")} and ${texts[texts.length - 1]}`;
  }

  static toFixed(
    num: number,
    maxFractionDigits: number,
    minFractionDigits = 0
  ) {
    const str = num.toFixed(maxFractionDigits);

    if (!str.includes(".")) {
      return str;
    }

    const split = str.split(".");
    const int = split[0];
    let fraction = split[1];

    for (let i = fraction.length - 1; i >= 0; i--) {
      if (fraction[i] !== "0") {
        fraction = fraction.substring(0, i + 1);
        break;
      } else if (i === 0) {
        fraction = "";
      }
    }

    if (minFractionDigits === 0 && fraction === "") {
      return int;
    }

    fraction = this.padRight(fraction, minFractionDigits, "0");

    return `${int}.${fraction}`;
  }

  static normalizeNewLine(str: string) {
    return str.replace(new RegExp("\r\n", "g"), "\n");
  }

  static escapeHtml(str: string, options?: { lineBreak?: boolean }) {
    const { lineBreak = true } = options || {};

    str = escapeHtmlLib(str);

    if (lineBreak) {
      str = str.replaceAll("\n", "<br />");
    }

    return str;
  }
}
