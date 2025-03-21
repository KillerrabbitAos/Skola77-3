import {signIn} from "next-auth/react";

export function SignInPrompt() {
    return (
        <div>
            <p>You are not signed in.</p>
            <button onClick={() => signIn()}>Sign In</button>
        </div>
    );
}