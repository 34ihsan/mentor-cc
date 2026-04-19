import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Fixing Service Slugs and Seeding German Content ---');

    const services = [
        {
            oldSlug: 'denklik',
            newSlug: 'denklik',
            title_de: 'Anerkennung',
            seoDescription_de: 'Professionelle Unterstützung bei der Feststellung der Gleichwertigkeit Ihrer im Ausland erworbenen Diplome in der Türkei.',
        },
        {
            oldSlug: 'universite',
            newSlug: 'yurtdisi-universite',
            title_de: 'Universität im Ausland',
            seoDescription_de: 'Studieren Sie an den besten Universitäten weltweit. Wir begleiten Sie von der Bewerbung bis zur Einschreibung.',
        },
        {
            oldSlug: 'master-yuksek-lisans',
            newSlug: 'yurtdisi-yuksek-lisans',
            title_de: 'Master & Postgraduiertenstudium',
            seoDescription_de: 'Bringen Sie Ihre Karriere auf die nächste Stufe mit einem Master-Abschluss im Ausland. Expertenberatung für Ihre akademische Zukunft.',
        },
        {
            oldSlug: 'lise',
            newSlug: 'yurtdisi-lise',
            title_de: 'Gymnasium im Ausland',
            seoDescription_de: 'Ein globaler Start für junge Talente. Besuchen Sie renommierte Gymnasien weltweit und bereiten Sie sich auf Top-Universitäten vor.',
        },
        {
            oldSlug: 'yaz-okulu',
            newSlug: 'yurtdisi-yaz-okullari',
            title_de: 'Sommerschulen im Ausland',
            seoDescription_de: 'Unvergessliche Sommererlebnisse für Jugendliche. Sprachkurse, Sport und Kultur an den besten Standorten weltweit.',
        },
        {
            oldSlug: 'dil-okullari',
            newSlug: 'yurtdisi-dil-okullari',
            title_de: 'Sprachschulen im Ausland',
            seoDescription_de: 'Lernen Sie eine neue Sprache dort, wo sie gesprochen wird. Effektive Sprachkurse weltweit für jedes Niveau.',
        }
    ];

    for (const s of services) {
        // Try to find by old slug first, then new slug if already updated
        const existing = await prisma.service.findFirst({
            where: {
                OR: [
                    { slug: s.oldSlug },
                    { slug: s.newSlug }
                ]
            }
        });

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: {
                    slug: s.newSlug,
                    title_de: s.title_de,
                    seoDescription_de: s.seoDescription_de,
                    active: true // Ensure they are active
                }
            });
            console.log(`Updated Service: ${s.newSlug}`);
        } else {
            console.log(`Service not found for: ${s.oldSlug} / ${s.newSlug}`);
        }
    }

    console.log('--- Seeding Country German Names ---');
    const countries = [
        { slug: 'almanya', name_de: 'Deutschland' },
        { slug: 'amerika', name_de: 'USA' },
        { slug: 'ingiltere', name_de: 'England' },
        { slug: 'kanada', name_de: 'Kanada' },
        { slug: 'avustralya', name_de: 'Australien' },
        { slug: 'belcika', name_de: 'Belgien' },
        { slug: 'hollanda', name_de: 'Niederlande' },
        { slug: 'irlanda', name_de: 'Irland' },
        { slug: 'polonya', name_de: 'Polen' },
        { slug: 'italya', name_de: 'Italien' },
        { slug: 'malta', name_de: 'Malta' }
    ];

    for (const c of countries) {
        const existing = await prisma.country.findUnique({
            where: { slug: c.slug }
        });

        if (existing) {
            await prisma.country.update({
                where: { id: existing.id },
                data: { name_de: c.name_de }
            });
            console.log(`Updated Country: ${c.slug} -> ${c.name_de}`);
        }
    }

    console.log('--- Done ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
