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
    return <img onClick={redirectToSettings} className={"light:border-black dark:border-lightgray cursor-pointer border-2 rounded-full size-14 m-2  "}
                src={props.user?.image as string} alt=":)"/>;
}