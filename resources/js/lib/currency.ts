/**
 * نظام العملة - ريال عماني
 */
export const CURRENCY = {
    code: 'OMR',
    name: 'ريال عماني',
    symbol: 'ر.ع.',
} as const;

export function formatPrice(amount: string | number): string {
    return `${amount} ${CURRENCY.symbol}`;
}
