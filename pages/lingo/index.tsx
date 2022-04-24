import { GetServerSidePropsContext } from "next"

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    return {
        redirect: {
            destination: "/",
        },
        props: {},
    }
}

const Page = () => {
    return (
        <>
            <div></div>
        </>
    )
}

export default Page
