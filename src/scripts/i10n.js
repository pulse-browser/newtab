//@ts-check
/// <reference types="web-ext-types"/>

document.querySelectorAll('[data-l10n-id]').forEach((/** @type {any} */ el) => {
  const id = el.dataset.l10nId
  const atr = el.dataset.l10nAttr || 'textContent'

  if (atr === 'textContent') {
    el.innerHTML = browser.i18n.getMessage(id)
  } else {
    el.setAttribute(atr, browser.i18n.getMessage(id))
  }
})
