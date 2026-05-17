const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.institution.findMany({
  select: { name: true, slug: true },
  orderBy: { name: 'asc' }
}).then(r => {
  r.forEach(x => console.log(x.slug + ' | ' + x.name));
  p.$disconnect();
});
