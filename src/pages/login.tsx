import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  const handleLogin = () => {
    void signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-20">
      <Image
        src="/images/spotify_logo.png"
        alt="spotify logo"
        width={320}
        height={96}
        objectFit="contain"
      />
      <button
        className="flex rounded-full bg-primary px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
