import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { GetFormByProductId } from "../../../libs/api/GetFormByProductId"
import { Form } from "../../../types/form"

interface FormPageProps {
  form: Form
}

const FormPage = ({ form }: FormPageProps) => {
  return <div>FormsPage</div>
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<FormPageProps>> {
  const productId = context.query.id as string

  const form = await GetFormByProductId(productId)

  return {
    props: {
      form,
    },
  }
}

export default FormPage
