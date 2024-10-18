import { FaXTwitter } from "react-icons/fa6";
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { redirect } from "react-router-dom";

const SigninSignup = () => {
    const { isAuthenticated, register, login } = useKindeAuth();
    console.log();
    
    if (isAuthenticated) {
        redirect('/');
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h2 className="text-3xl font-semibold mb-8">Global Chat</h2>
            <FaXTwitter className="text-6xl text-blue-500 mb-8" />
            <div className="flex flex-col items-center">
                <button
                    onClick={() => register({
                        authUrlParams: {
                            connectionId:  'conn_01927f6172ecca222ba18b79864f6ca6',
                        }

                    })}
                    type="button"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md mb-4 hover:bg-blue-600 transition-all w-48"
                >
                    Sign up
                </button>
                <div className="text-gray-500 mb-4">or</div>
                <button
                    onClick={() => login({
                        authUrlParams: {
                            connectionId: 'conn_01927f6172ecca222ba18b79864f6ca6',
                        }
                    })}
                    type="button"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all w-48"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SigninSignup;
