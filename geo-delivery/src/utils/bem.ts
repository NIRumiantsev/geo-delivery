import { withNaming } from '@bem-react/classname';

const reactBemNaming = { e: '-', m: '_', v: '_' };

const cn = withNaming(reactBemNaming);

export { cn };
