enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType = CacheType.Local) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (!key) return
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    if (!key) return
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    if (!key) return
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
export { localCache, sessionCache }
