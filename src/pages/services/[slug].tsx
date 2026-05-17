import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Service = {
  title: string
  slug: string
  summary?: string
  body?: string
  hero_image?: string
  seo_title?: string
  seo_description?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'src', 'content', 'services')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  const paths = files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    return { params: { slug: data.slug || f.replace('.json','') } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const p = path.join(process.cwd(), 'src', 'content', 'services', `${slug}.json`)
  const raw = fs.readFileSync(p, 'utf8')
  const data = JSON.parse(raw)
  return { props: { service: data } }
}

export default function ServicePage({ service }: { service: Service }) {
  return (
    <main>
      <h1>{service.title}</h1>
      {service.hero_image && <img src={service.hero_image} alt={service.title} style={{maxWidth: '100%', height: 'auto'}} />}
      <p>{service.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: service.body || '' }} />
    </main>
  )
}
