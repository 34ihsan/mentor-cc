import { describe, it, expect } from 'vitest';
import tr from '../../messages/tr.json';
import en from '../../messages/en.json';
import de from '../../messages/de.json';

describe('i18n Translation Consistency', () => {
  const getKeys = (obj: any, prefix = ''): string[] => {
    return Object.keys(obj).reduce((res: string[], el) => {
      if (Array.isArray(obj[el])) {
        return res;
      } else if (typeof obj[el] === 'object' && obj[el] !== null) {
        return [...res, ...getKeys(obj[el], prefix + el + '.')];
      }
      return [...res, prefix + el];
    }, []);
  };

  it('EN should have all keys from TR', () => {
    const trKeys = getKeys(tr);
    const enKeys = getKeys(en);
    
    trKeys.forEach(key => {
      expect(enKeys).toContain(key);
    });
  });

  it('DE should have all keys from TR', () => {
    const trKeys = getKeys(tr);
    const deKeys = getKeys(de);
    
    trKeys.forEach(key => {
      expect(deKeys).toContain(key);
    });
  });

  it('TR should have all keys from EN', () => {
    const trKeys = getKeys(tr);
    const enKeys = getKeys(en);
    
    enKeys.forEach(key => {
      expect(trKeys).toContain(key);
    });
  });
});
