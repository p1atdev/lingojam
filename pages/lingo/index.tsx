import { GetStaticProps } from "next"

// export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
export const getStaticProps: GetStaticProps = async (ctx) => {
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
