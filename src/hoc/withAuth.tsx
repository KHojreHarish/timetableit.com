import { GetServerSidePropsContext } from "next";
import admin from "@/app/firebaseAdmin"; // Firebase Admin SDK

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const { req } = context;
    const token = req.headers.cookie?.split("token=")[1];

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      return {
        props: {
          user: {
            ...decodedToken, // Spread all token information, including uid
          },
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;
