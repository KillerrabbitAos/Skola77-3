import React, { useEffect, useState } from "react";
import { SmallProfilePicture } from "@/components/smallProfilePicture";
import { useSession } from "next-auth/react";
import { SignInPrompt } from "@/components/signInPrompt";
import { LeftArrowButton } from "@/components/leftArrowButton";
import { SearchField } from "@/components/searchField";
import { useRouter } from "next/navigation";

function NavHeadingProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const user = session?.user;

  function redirectHome() {
    router.replace("/");
  }

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return null;
  if (!user) return <SignInPrompt />;

  return (
    <>
    <div className="h-20 flex items-center">
      <div className="grid grid-cols-5 w-full">
        <div className="flex items-center justify-start">
        <LeftArrowButton onClick={redirectHome} />
        </div>
        <div className="flex col-span-3 items-center justify-center">
        <SearchField />
        </div>
        <div className="flex justify-end items-center">
        <SmallProfilePicture user={user} />
        </div>
      </div>
    </div>
      {children}
    </>
  );
}

export default NavHeadingProvider;
