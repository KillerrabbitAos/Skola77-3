export function Profile(props: {
    user: {
        id: string | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined
    }
}) {
    return <img className={"rounded-full size-14 m-2"} src={props.user?.image as string} alt=":)"/>;
}