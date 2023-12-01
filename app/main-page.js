import { createViewModel } from './main-view-model';

export function onNavigatingTo(args) {
  const page = args.object

  page.bindingContext = createViewModel()
}

export function setFocusId(args) {
  const ctx = args.object.parent.bindingContext;
  ctx.setFocusId(args.object.bindingContext.id)
}
