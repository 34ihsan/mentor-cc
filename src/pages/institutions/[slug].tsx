import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Institution = {
  name: string
  slug: string
  country?: string
  type?: string
  summary?: string
  body?: string
  website?: string
  logo?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'src', 'content', 'institutions')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  const paths = files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    return { params: { slug: data.slug || f.replace('.json','') } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const p = path.join(process.cwd(), 'src', 'content', 'institutions', `${slug}.json`)
  const raw = fs.readFileSync(p, 'utf8')
  const data = JSON.parse(raw)
  return { props: { institution: data } }
}

export default function InstitutionPage({ institution }: { institution: Institution }) {
  return (
    <main>
      <h1>{institution.name}</h1>
      {institution.logo && <img src={institution.logo} alt={`${institution.name} logo`} style={{maxWidth:120, height: 'auto'}} />}
      <p>{institution.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: institution.body || '' }} />
      {institution.website && <p><a href={institution.website} target="_blank" rel="noreferrer">Official website</a></p>}
    </main>
  )
}
