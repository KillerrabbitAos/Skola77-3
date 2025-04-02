import { signIn } from "next-auth/react";

export function SignInPrompt() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <p className="mb-4 text-lg text-gray-700">You are not signed in.</p>
      <button
        onClick={() => signIn()}
        className="px-6 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 transition duration-200"
      >
        Sign in
      </button>
    </div>
  );
}
