import { describe, it, expect } from 'vitest';
import { countryMap } from '@/lib/mappings/countries';
import { serviceMap } from '@/lib/mappings/services';

describe('Data Mappings Consistency', () => {
  describe('Country Mappings', () => {
    it('should have consistent internationalization fields for all countries', () => {
      Object.entries(countryMap).forEach(([slug, data]) => {
        expect(data.title, `Country ${slug} missing title`).toBeDefined();
        expect(data.title_en, `Country ${slug} missing title_en`).toBeDefined();
        expect(data.title_de, `Country ${slug} missing title_de`).toBeDefined();
        expect(data.image, `Country ${slug} missing image`).toBeDefined();
      });
    });
  });

  describe('Service Mappings', () => {
    it('should have consistent internationalization fields for all services', () => {
      Object.entries(serviceMap).forEach(([slug, data]) => {
        expect(data.title, `Service ${slug} missing title`).toBeDefined();
        expect(data.title_en, `Service ${slug} missing title_en`).toBeDefined();
        expect(data.title_de, `Service ${slug} missing title_de`).toBeDefined();
        expect(data.desc, `Service ${slug} missing desc`).toBeDefined();
        expect(data.desc_en, `Service ${slug} missing desc_en`).toBeDefined();
        expect(data.desc_de, `Service ${slug} missing desc_de`).toBeDefined();

        if (data.categories) {
          data.categories.forEach((cat: any, index: number) => {
            expect(cat.title, `Service ${slug} category ${index} missing title`).toBeDefined();
            expect(cat.title_en, `Service ${slug} category ${index} missing title_en`).toBeDefined();
            expect(cat.title_de, `Service ${slug} category ${index} missing title_de`).toBeDefined();
            expect(cat.desc, `Service ${slug} category ${index} missing desc`).toBeDefined();
            expect(cat.desc_en, `Service ${slug} category ${index} missing desc_en`).toBeDefined();
            expect(cat.desc_de, `Service ${slug} category ${index} missing desc_de`).toBeDefined();
          });
        }
      });
    });
  });
});
