import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Country = {
  name: string
  slug: string
  summary?: string
  body?: string
  primary_image?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'src', 'content', 'countries')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  const paths = files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    return { params: { slug: data.slug || f.replace('.json','') } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const p = path.join(process.cwd(), 'src', 'content', 'countries', `${slug}.json`)
  const raw = fs.readFileSync(p, 'utf8')
  const data = JSON.parse(raw)
  // also load institutions for country
  const instDir = path.join(process.cwd(), 'src', 'content', 'institutions')
  const institutions = [] as any[]
  try {
    const files = fs.readdirSync(instDir).filter(f => f.endsWith('.json'))
    for (const f of files) {
      const d = JSON.parse(fs.readFileSync(path.join(instDir, f), 'utf8'))
      if (d.country === slug) institutions.push(d)
    }
  } catch (e) {
    // ignore
  }
  return { props: { country: data, institutions } }
}

export default function CountryPage({ country, institutions }: { country: Country, institutions: any[] }) {
  return (
    <main>
      <h1>{country.name}</h1>
      {country.primary_image && <img src={country.primary_image} alt={country.name} style={{maxWidth: '100%', height: 'auto'}} />}
      <p>{country.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: country.body || '' }} />

      <section>
        <h2>Institutions in {country.name}</h2>
        <ul>
          {institutions.map((inst) => (
            <li key={inst.slug}><a href={`/institutions/${inst.slug}`}>{inst.name}</a> — {inst.type}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
