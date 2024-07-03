// Remote GraphQL server endpoint URL
const graphqlEndpoint =
  'https://supaas-cms.next-nonprod.aws.reecetech.cloud/api';

export default async function fetchData(
  graphql: string,
  previewToken?: string,
) {
  const res = await fetch(
    `${graphqlEndpoint}${previewToken ? `?token=${previewToken}` : ``}`,
    {
      method: 'post',
      body: graphql,
      headers: {
        'Content-Type': 'application/graphql',
      },
    },
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
