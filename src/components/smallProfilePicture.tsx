export function SmallProfilePicture(props: {
    user: {
        id: string | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined
    }

}) {
    function redirectToProfile() {
        window.location.href = "/profile";
    }

    // eslint-disable-next-line @next/next/no-img-element
    return <img onClick={redirectToProfile}
                className="light:border-[#121212] dark:border-lightgray cursor-pointer border-2 rounded-full m-2 h-[35px]"
                src={props.user?.image as string || "/avatar.png"} alt="Avatar"/>;
}