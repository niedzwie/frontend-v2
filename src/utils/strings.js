import I18n from '@/i18n'
import Console from '@/utils/Console'
import marked from 'marked'

marked.setOptions({
  breaks: true,
  silent: true
})

function markdown (content) {
  return marked(content)
}

function translateMarkdown (object, key) {
  return marked(translate(object, key).replace(/\\n/gm, '\n'))
}

function getLocaleMessage (object, localeKey, key, language) {
  return object[localeKey][language] || object[localeKey][I18n.fallbackLocale] || object[key] || ''
}

function translate (object, key) {
  const locale = I18n.locale
  const localeKey = `${key}_i18n`
  // Console.debug("StringI18n", `generating translation. locale-${locale} key-${localeKey} [${key}]`, object)
  if (object) {
    if (object[localeKey]) {
      if (object[localeKey][locale]) {
        return getLocaleMessage(object, localeKey, key, locale)
      } else {
        const languages = locale.split('-')
        if (languages[0] !== '') {
          return getLocaleMessage(object, localeKey, key, languages[0])
        } else {
          Console.warn('StringI18n', `translation error: ${key}: Specific country code detected but it's invalid`, locale, languages)
          return ''
        }
      }
    } else {
      return object[key] || ''
    }
  } else {
    return ''
  }
}

// function translate (object, key) {
//   let server = store.getters["dataSource/server"];
//   let serverKey = `${key}_i18n`;
//   // Console.debug("StringI18n", `generating translation. locale-${locale} key-${localeKey} [${key}]`, object)
//   if (object) {
//     if (serverKey in object) {
//       if (server in object[serverKey]) {
//         return object[serverKey][server]
//       } else {
//         return ""
//       }
//     } else {
//       return object[key] || ""
//     }
//   } else {
//     return ""
//   }
// }

// from https://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference

function getFirstBrowserLanguageWithRegionCode () {
  const nav = window.navigator
  const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage']
  let i
  let language
  let len
  let shortLanguage = null

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i]
      len = language.length
      if (!shortLanguage && len) {
        shortLanguage = language
      }
      if (language && len > 2) {
        return language
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]]
    // skip this loop iteration if property is null/undefined.  IE11 fix.
    if (language == null) { continue }
    len = language.length
    if (!shortLanguage && len) {
      shortLanguage = language
    }
    if (language && len > 2) {
      return language
    }
  }

  return shortLanguage
}

function getFirstBrowserLanguage () {
  const language = getFirstBrowserLanguageWithRegionCode().replace('_', '-')
  if (!language) return I18n.fallbackLocale // use default
  const languages = language.split('-')
  if (languages.length === 1) {
    return language
  } else if (languages.length === 2) {
    return languages[0]
  } else {
    // probably malformed...
    return language
  }
}

function fileSize (bytes, si) {
  var thresh = si ? 1000 : 1024
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  var u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default { translate, markdown, translateMarkdown, getFirstBrowserLanguage, fileSize, capitalize }
