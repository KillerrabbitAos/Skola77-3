export function LargeProfilePicture(props: {
    user: {
        id: string | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined
    }

}) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img
                className="light:border-[#121212] dark:border-lightgray cursor-pointer border-2 rounded-full size-14 m-2"
                src={props.user?.image as string} alt=":)"/>;
}