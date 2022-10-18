import { GetStaticPropsContext } from "next"
import React from "react"
import AxiosClient from "../../libs/AxiosClient"

const CatalogPage = () => {
  return <div>CatalogPage</div>
}

export const getStaticProps = async (props: GetStaticPropsContext) => {
  const res = await AxiosClient.get(`/items`)

  const data = res.data

  return {
    props: {
      data,
    },
  }
}

export default CatalogPage
