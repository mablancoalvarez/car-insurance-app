import { answerQuestion, openingBrief, rankProducts } from '../../assistant/advise';
import type { Product } from '../../types';

const product = (overrides: Partial<Product>): Product => ({
  id: overrides.id ?? 'id',
  company: overrides.company ?? 'AXA',
  modality: overrides.modality ?? { id: 1, name: 'Terceros' },
  price: overrides.price ?? 100000,
  final_price: overrides.final_price ?? 1,
  excess: overrides.excess ?? 0,
  logo: 'logos/axa.svg',
  grade: overrides.grade ?? { total: 7 },
  features: overrides.features ?? [],
});

const catalog = [
  product({ id: 'a', company: 'AXA', price: 120000, grade: { total: 6.2 } }),
  product({
    id: 'm',
    company: 'MAPFRE',
    price: 60000,
    final_price: 0,
    grade: { total: 9 },
  }),
];

describe('tariff assistant', () => {
  it('ranks the stronger grade ahead of a weaker expensive tariff', () => {
    expect(rankProducts(catalog).map((item) => item.company)).toEqual([
      'MAPFRE',
      'AXA',
    ]);
  });

  it('names a pick in the opening brief', () => {
    expect(openingBrief(catalog)).toContain('MAPFRE');
  });

  it('answers the cheapest tariff from the visible set', () => {
    expect(answerQuestion('la más barata', catalog)).toContain('600,00');
  });

  it('says when the filter is empty', () => {
    expect(answerQuestion('compara', [])).toMatch(/no deja tarifas/);
  });
});
