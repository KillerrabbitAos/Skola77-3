export function Profile(props: {
    user: {
        id: string | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined
    }

}) {
    function redirectToSettings(){
        window.location.href = "/settings";
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img onClick={redirectToSettings} className={"border-black dark:border-white border-3 rounded-full size-14 m-2  "}
                src={props.user?.image as string} alt=":)"/>;
}