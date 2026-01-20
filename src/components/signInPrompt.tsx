import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function SignInPrompt() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setFormError('Invalid credentials');
    } else if (res?.ok) {
      router.push(res.url ?? '/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {formError && <p className="text-red-500 mb-3">{formError}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full mb-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>

        <div className="mt-2 mb-3">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Sign In with Google
          </button>
        </div>
        <div className='cursor-pointer hover:underline text-gray-700'><a href="/register">Don't have an account? Register</a></div>

      </form>
    </div>
  );
}