'use client'

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import {
  fetchAnalyticsSummary,
  type OrderStatus,
  type EventSummary,
  type ApiProduct,
  type UpdateProductRequest,
} from '@/lib/api'
import {
  useOrders,
  useAnalyticsSummary,
  useProductsAdmin,
  useUpdateProduct,
  useDeleteProduct,
  useCreateManualOrder,
} from '@/lib/queries'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PAID: 'bg-green-100 text-green-300 border-green-500/20',
    PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    FAILED: 'bg-red-500/10 text-red-600 border-red-500/20',
    REFUNDED: 'bg-purple-100 text-purple-700 border-purple-200',
  }
  const labels: Record<string, string> = {
    PAID: 'Оплачено',
    PENDING: 'Очікування',
    FAILED: 'Помилка',
    REFUNDED: 'Повернення',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        colors[status] ?? 'bg-sand text-ink-soft border-line'
      }`}
    >
      {labels[status] ?? status}
    </span>
  )
}

function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [adminKey, setAdminKey] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      await fetchAnalyticsSummary(adminKey, 1)
      sessionStorage.setItem('admin_key', adminKey)
      toast.success('Вхід успішний')
      onLogin(adminKey)
    } catch {
      setError(true)
      toast.error('Невірний ключ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-clay-dark text-sm font-semibold uppercase tracking-widest mb-2">
            Admin
          </p>
          <h1 className="text-2xl font-black text-ink">діабет.net</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
        >
          <div>
            <label className="text-ink-soft text-sm block mb-2">Admin Key</label>
            <input
              type="password"
              autoFocus
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-line rounded-2xl px-4 py-3 text-ink placeholder-muted-ink focus:outline-none focus:border-clay transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">Невірний ключ</p>}
          <button
            type="submit"
            disabled={loading || !adminKey}
            className="w-full bg-clay hover:bg-clay-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-white font-bold py-3 rounded-2xl transition-colors"
          >
            {loading ? 'Перевірка...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  )
}

function StatsTab({
  events,
  orders,
}: {
  events: EventSummary[]
  orders: OrderStatus[]
}) {
  const paidOrders = orders.filter((o) => o.status === 'PAID')
  const totalRevenue = paidOrders.reduce(
    (sum, o) => sum + parseFloat(o.amount),
    0,
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Загальна виручка"
          value={`${totalRevenue.toLocaleString('uk-UA')} грн`}
          accent
        />
        <StatCard label="Оплачено" value={String(paidOrders.length)} />
        <StatCard
          label="Очікування"
          value={String(orders.filter((o) => o.status === 'PENDING').length)}
        />
        <StatCard
          label="Помилки"
          value={String(orders.filter((o) => o.status === 'FAILED').length)}
        />
      </div>

      <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">
        <h3 className="text-ink font-semibold mb-4">Топ події</h3>
        {events.length === 0 ? (
          <p className="text-muted-ink text-sm">Немає даних</p>
        ) : (
          <div className="flex flex-col gap-2">
            {events.slice(0, 15).map((ev) => (
              <div key={ev.event} className="flex items-center justify-between gap-3">
                <span className="text-ink-soft text-sm font-mono truncate">
                  {ev.event}
                </span>
                <span className="text-muted-ink text-sm shrink-0">{ev.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">
      <p className="text-muted-ink text-xs uppercase tracking-wider mb-1">{label}</p>
      <p
        className={`text-2xl font-black ${accent ? 'text-clay-dark' : 'text-ink'}`}
      >
        {value}
      </p>
    </div>
  )
}

// Оплата готівкою: замовлення створюється одразу як оплачене, людина заходить
// на /my за своєю поштою і бачить продукт.
function ManualOrderForm({
  adminKey,
  products,
}: {
  adminKey: string
  products: ApiProduct[]
}) {
  const active = products.filter((p) => p.isActive)
  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const createOrder = useCreateManualOrder(adminKey)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createOrder.mutate(
      { productId, customerEmail: email.trim(), customerName: name.trim() || undefined },
      {
        onSuccess: () => {
          toast.success(`Доступ відкрито: ${email.trim()}`)
          setEmail('')
          setName('')
          setOpen(false)
        },
        onError: (err: Error) => toast.error(err.message || 'Не вдалося створити замовлення'),
      },
    )
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setProductId(active[0]?.id ?? '')
          setOpen(true)
        }}
        disabled={!active.length}
        className="self-start px-4 py-2 rounded-lg text-sm font-medium bg-clay hover:bg-clay-dark disabled:opacity-40 text-white cursor-pointer transition-colors"
      >
        + Створити замовлення (готівка)
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="text-ink font-semibold">Оплата поза сайтом</div>
      <p className="text-muted-ink text-sm">
        Замовлення одразу отримає статус «оплачено». Людина заходить на /my за цією поштою
        і бачить продукт.
      </p>
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="bg-white border border-line rounded-lg px-3 py-2 text-sm text-ink"
      >
        {active.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title} — {p.price} грн
          </option>
        ))}
      </select>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Пошта покупця"
        className="bg-white border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted-ink"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ім'я (необов'язково)"
        className="bg-white border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted-ink"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={createOrder.isPending || !email.trim() || !productId}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-clay hover:bg-clay-dark disabled:opacity-40 text-white cursor-pointer transition-colors"
        >
          {createOrder.isPending ? 'Створюю…' : 'Відкрити доступ'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted-ink hover:text-ink cursor-pointer transition-colors"
        >
          Скасувати
        </button>
      </div>
    </form>
  )
}

function OrdersTab({
  adminKey,
  orders,
  products,
}: {
  adminKey: string
  orders: OrderStatus[]
  products: ApiProduct[]
}) {
  const productMap = Object.fromEntries(products.map((p) => [p.id, p.title]))

  return (
    <div className="flex flex-col gap-4">
      <ManualOrderForm adminKey={adminKey} products={products} />
      <span className="text-muted-ink text-sm">{orders.length} замовлень</span>
      <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <p className="text-muted-ink text-sm text-center py-16">
            Замовлень не знайдено
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left text-muted-ink font-medium px-5 py-3">
                    Дата
                  </th>
                  <th className="text-left text-muted-ink font-medium px-5 py-3">
                    Email
                  </th>
                  <th className="text-left text-muted-ink font-medium px-5 py-3">
                    Продукт
                  </th>
                  <th className="text-right text-muted-ink font-medium px-5 py-3">
                    Сума
                  </th>
                  <th className="text-left text-muted-ink font-medium px-5 py-3">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-line hover:bg-sand/60 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-muted-ink whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 text-ink max-w-50 truncate">
                      {order.customerEmail}
                    </td>
                    <td className="px-5 py-3.5 text-ink-soft whitespace-nowrap">
                      {productMap[order.productId] ?? order.productId}
                    </td>
                    <td className="px-5 py-3.5 text-clay-dark font-semibold text-right whitespace-nowrap">
                      {order.amount} грн
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const EMPTY_EDIT: UpdateProductRequest = {
  title: '',
  description: '',
  price: '',
  videoUrl: '',
  isActive: true,
  order: 1,
}

function ProductsTab({
  adminKey,
  products,
}: {
  adminKey: string
  products: ApiProduct[]
}) {
  const updateMut = useUpdateProduct(adminKey)
  const deleteMut = useDeleteProduct(adminKey)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<UpdateProductRequest>(EMPTY_EDIT)
  const saving = updateMut.isPending
    ? updateMut.variables?.id
    : deleteMut.isPending
      ? deleteMut.variables
      : null

  function startEdit(product: ApiProduct) {
    setEditingId(product.id)
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price,
      videoUrl: product.videoUrl ?? '',
      isActive: product.isActive,
      order: product.order,
    })
  }

  function saveEdit(productId: string) {
    const payload: UpdateProductRequest = { ...editForm }
    if (!payload.videoUrl || !payload.videoUrl.trim()) {
      delete payload.videoUrl
    }
    updateMut.mutate(
      { id: productId, data: payload },
      {
        onSuccess: () => {
          setEditingId(null)
          toast.success('Продукт збережено')
        },
        onError: (e) =>
          toast.error('Помилка збереження: ' + (e as Error).message),
      },
    )
  }

  function handleDelete(productId: string) {
    if (!confirm('Видалити продукт?')) return
    deleteMut.mutate(productId, {
      onSuccess: () => toast.success('Продукт видалено'),
      onError: (e) =>
        toast.error('Помилка видалення: ' + (e as Error).message),
    })
  }

  const inputCls =
    'w-full bg-white border border-line rounded-lg px-3 py-2 text-ink text-sm placeholder-muted-ink focus:outline-none focus:border-clay transition-colors'

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white border rounded-2xl p-5 flex flex-col gap-4 shadow-sm ${
            !product.isActive ? 'border-line opacity-60' : 'border-line'
          }`}
        >
          {editingId === product.id ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-muted-ink text-xs">Назва</label>
                  <input
                    className={inputCls}
                    value={editForm.title ?? ''}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, title: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-muted-ink text-xs">Ціна (грн)</label>
                  <input
                    className={inputCls}
                    value={editForm.price ?? ''}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, price: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-muted-ink text-xs">Опис</label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={3}
                    value={editForm.description ?? ''}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-muted-ink text-xs">Video URL</label>
                  <input
                    className={inputCls}
                    value={editForm.videoUrl ?? ''}
                    placeholder="https://..."
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, videoUrl: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-muted-ink text-xs">Порядок</label>
                  <input
                    type="number"
                    className={inputCls}
                    value={editForm.order ?? 1}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        order: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isActive ?? true}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, isActive: e.target.checked }))
                    }
                    className="w-4 h-4 accent-clay"
                  />
                  <span className="text-ink-soft text-sm">Активний</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => void saveEdit(product.id)}
                  disabled={saving === product.id}
                  className="px-4 py-2 rounded-2xl text-sm font-semibold bg-clay text-white hover:bg-clay-dark disabled:opacity-40 cursor-pointer transition-colors"
                >
                  {saving === product.id ? 'Зберігаємо...' : 'Зберегти'}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-2xl text-sm font-semibold bg-sand text-ink-soft hover:bg-line cursor-pointer transition-colors"
                >
                  Скасувати
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ink font-semibold">{product.title}</p>
                <p className="text-muted-ink text-sm">
                  {product.price} грн · порядок {product.order}
                </p>
                <p className="text-muted-ink text-xs font-mono mt-1">{product.id}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(product)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-sand text-ink-soft hover:bg-line cursor-pointer transition-colors"
                >
                  Редагувати
                </button>
                <button
                  onClick={() => void handleDelete(product.id)}
                  disabled={saving === product.id}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-500/20 hover:bg-red-500/10 disabled:opacity-40 cursor-pointer transition-colors"
                >
                  {saving === product.id ? '...' : 'Видалити'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

type Tab = 'stats' | 'orders' | 'products'

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('stats')

  useEffect(() => {
    setAdminKey(sessionStorage.getItem('admin_key'))
  }, [])

  const ordersQ = useOrders(adminKey)
  const eventsQ = useAnalyticsSummary(adminKey, 30)
  const productsQ = useProductsAdmin(!!adminKey)

  const orders: OrderStatus[] = ordersQ.data ?? []
  const events: EventSummary[] = eventsQ.data ?? []
  const products: ApiProduct[] = productsQ.data ?? []

  const loading = ordersQ.isLoading || eventsQ.isLoading || productsQ.isLoading
  const error = ordersQ.isError || eventsQ.isError || productsQ.isError

  useEffect(() => {
    if (error && adminKey) {
      sessionStorage.removeItem('admin_key')
      setAdminKey(null)
      toast.error('Помилка авторизації')
    }
  }, [error, adminKey])

  function handleLogout() {
    sessionStorage.removeItem('admin_key')
    setAdminKey(null)
  }

  if (!adminKey) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <LoginScreen onLogin={setAdminKey} />
      </>
    )
  }

  const TABS: [Tab, string][] = [
    ['stats', 'Огляд'],
    ['orders', 'Замовлення'],
    ['products', 'Продукти'],
  ]

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Toaster position="top-right" richColors />
      <div className="border-b border-line bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-clay-dark font-black text-lg">діабет.net</span>
            <span className="text-muted-ink text-sm">/ адмін</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1 flex-wrap">
              {TABS.map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    activeTab === tab
                      ? 'bg-sand text-ink'
                      : 'text-muted-ink hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="text-muted-ink hover:text-ink text-sm cursor-pointer transition-colors"
            >
              Вийти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-clay border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-16">Помилка завантаження</p>
        ) : (
          <>
            {activeTab === 'stats' && <StatsTab events={events} orders={orders} />}
            {activeTab === 'orders' && (
              <OrdersTab adminKey={adminKey} orders={orders} products={products} />
            )}
            {activeTab === 'products' && (
              <ProductsTab adminKey={adminKey} products={products} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
