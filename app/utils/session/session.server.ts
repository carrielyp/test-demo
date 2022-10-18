import { createCookieSessionStorage, Session } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "RPG_session",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      secure: process.env.NODE_ENV === "production"
    }
  });

export const getCookieSessionStorage = async (request: Request) => {
  return await getSession(request.headers.get("Cookie"));
};

export const commitCookieSessionStorage = async (session: Session) => {
  return {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  };
};

export const destroyCookieSessionStorage = async (session: Session) => {
  return {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  };
};
