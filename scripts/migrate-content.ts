
import { PrismaClient } from '@prisma/client';
import { 
    UNIVERSITY_COUNTRIES_DATA_TR, 
    UNIVERSITY_COUNTRIES_DATA_EN, 
    UNIVERSITY_COUNTRIES_DATA_DE,
    DENKLIK_COUNTRIES_DATA,
    PROGRAM_DATA_TR,
    PROGRAM_DATA_EN,
    PROGRAM_DATA_DE
} from '../src/data/program-content';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting migration...');

    // 1. Migrate University Data
    const universityService = await prisma.service.findUnique({ where: { slug: 'yurtdisi-universite' } });
    if (universityService) {
        console.log('Migrating University Data...');
        const countries = Object.keys(UNIVERSITY_COUNTRIES_DATA_TR);
        for (const slug of countries) {
            const country = await prisma.country.findUnique({ where: { slug } });
            if (country) {
                const tr = UNIVERSITY_COUNTRIES_DATA_TR[slug];
                const en = UNIVERSITY_COUNTRIES_DATA_EN?.[slug] || UNIVERSITY_COUNTRIES_DATA_EN?.[slug === 'almanya' ? 'germany' : slug]; // handle slug mapping
                const de = UNIVERSITY_COUNTRIES_DATA_DE?.[slug] || UNIVERSITY_COUNTRIES_DATA_DE?.[slug === 'almanya' ? 'deutschland' : slug];

                await prisma.countryServiceContent.upsert({
                    where: { countryId_serviceId: { countryId: country.id, serviceId: universityService.id } },
                    create: {
                        countryId: country.id,
                        serviceId: universityService.id,
                        content: tr?.overview,
                        content_en: en?.overview,
                        content_de: de?.overview,
                        metadata: JSON.stringify({ 
                            advantages: tr?.advantages,
                            process: tr?.process,
                            faq: tr?.faq,
                            heroDesc: tr?.heroDesc,
                            heroImage: tr?.heroImage,
                            destinations: tr?.destinations
                        })
                    },
                    update: {
                        content: tr?.overview,
                        content_en: en?.overview,
                        content_de: de?.overview,
                        metadata: JSON.stringify({ 
                            advantages: tr?.advantages,
                            process: tr?.process,
                            faq: tr?.faq,
                            heroDesc: tr?.heroDesc,
                            heroImage: tr?.heroImage,
                            destinations: tr?.destinations
                        })
                    }
                });
            }
        }
    }

    // 2. Migrate Denklik Data
    const denklikService = await prisma.service.findUnique({ where: { slug: 'denklik' } });
    if (denklikService) {
        console.log('Migrating Denklik Data...');
        const countries = Object.keys(DENKLIK_COUNTRIES_DATA);
        for (const slug of countries) {
            const country = await prisma.country.findUnique({ where: { slug } });
            if (country) {
                const data = DENKLIK_COUNTRIES_DATA[slug];
                await prisma.countryServiceContent.upsert({
                    where: { countryId_serviceId: { countryId: country.id, serviceId: denklikService.id } },
                    create: {
                        countryId: country.id,
                        serviceId: denklikService.id,
                        content: data.overview,
                        metadata: JSON.stringify({
                            advantages: data.advantages,
                            process: data.process,
                            faq: data.faq,
                            heroDesc: data.heroDesc,
                            heroImage: data.heroImage,
                            destinations: data.destinations
                        })
                    },
                    update: {
                        content: data.overview,
                        metadata: JSON.stringify({
                            advantages: data.advantages,
                            process: data.process,
                            faq: data.faq,
                            heroDesc: data.heroDesc,
                            heroImage: data.heroImage,
                            destinations: data.destinations
                        })
                    }
                });
            }
        }
    }


    // 3. Migrate Generic Service Data
    console.log('Migrating Generic Service Data...');
    const serviceSlugs = Object.keys(PROGRAM_DATA_TR);
    for (const slug of serviceSlugs) {
        const tr = PROGRAM_DATA_TR[slug];
        const en = PROGRAM_DATA_EN?.[slug];
        const de = PROGRAM_DATA_DE?.[slug];

        if (tr) {
            await prisma.service.update({
                where: { slug },
                data: {
                    content: tr.overview,
                    content_en: en?.overview,
                    content_de: de?.overview,
                    image: tr.heroImage,
                    seoDescription: tr.heroDesc,
                    seoDescription_en: en?.heroDesc,
                    seoDescription_de: de?.heroDesc,
                    imageSettings: JSON.stringify({
                        advantages: tr.advantages,
                        process: tr.process,
                        faq: tr.faq,
                        destinations: tr.destinations
                    })
                }
            }).catch(e => console.log(`Service ${slug} not found in DB, skipping.`));
        }
    }

    console.log('Migration completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
