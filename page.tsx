'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Wallet, BarChart3, Plus, Trash2, Edit2, Eye, EyeOff, Home, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

interface Account {
  id: number
  name: string
  platform: 'ftmo' | 'lucid'
  balance: string
  equity: string
  drawdown: string
  dailyPnL: string
  winRate: string
  totalTrades: string
  apiKey: string
  showApiKey?: boolean
  createdAt?: string
}

interface FormData {
  name: string
  platform: 'ftmo' | 'lucid'
  balance: string
  equity: string
  drawdown: string
  dailyPnL: string
  winRate: string
  totalTrades: string
  apiKey: string
  showApiKey: boolean
}

export default function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    platform: 'ftmo',
    balance: '',
    equity: '',
    drawdown: '',
    dailyPnL: '',
    winRate: '',
    totalTrades: '',
    apiKey: '',
    showApiKey: false
  })
  const [isLoading, setIsLoading] = useState(true)

  // Charger les données depuis localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tradingAccounts')
      if (saved) {
        setAccounts(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sauvegarder les données
  const saveAccounts = (newAccounts: Account[]) => {
    try {
      localStorage.setItem('tradingAccounts', JSON.stringify(newAccounts))
      setAccounts(newAccounts)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const handleAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editingId) {
      const updated = accounts.map(acc =>
        acc.id === editingId ? { ...acc, ...formData } : acc
      )
      saveAccounts(updated)
      setEditingId(null)
    } else {
      const newAccount: Account = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      saveAccounts([...accounts, newAccount])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      platform: 'ftmo',
      balance: '',
      equity: '',
      drawdown: '',
      dailyPnL: '',
      winRate: '',
      totalTrades: '',
      apiKey: '',
      showApiKey: false
    })
    setShowForm(false)
  }

  const handleEdit = (account: Account) => {
    setFormData({ ...account, showApiKey: false })
    setEditingId(account.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      saveAccounts(accounts.filter(acc => acc.id !== id))
    }
  }

  const calculateTotals = () => {
    return accounts.reduce(
      (totals, acc) => ({
        balance: totals.balance + (parseFloat(acc.balance) || 0),
        equity: totals.equity + (parseFloat(acc.equity) || 0),
        dailyPnL: totals.dailyPnL + (parseFloat(acc.dailyPnL) || 0)
      }),
      { balance: 0, equity: 0, dailyPnL: 0 }
    )
  }

  const totals = calculateTotals()
  const totalDrawdown =
    accounts.length > 0
      ? (accounts.reduce((sum, acc) => sum + (parseFloat(acc.drawdown) || 0), 0) / accounts.length).toFixed(2)
      : '0'

  const ftmoAccounts = accounts.filter(a => a.platform === 'ftmo')
  const lucidAccounts = accounts.filter(a => a.platform === 'lucid')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📈</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Trading Hub</h1>
                <p className="text-xs text-slate-400">FTMO & Lucid</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Ajouter</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Résumé Global */}
        {accounts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
            <StatCard
              label="Balance Totale"
              value={`$${totals.balance.toFixed(2)}`}
              icon={<Wallet className="text-blue-400" size={32} />}
            />
            <StatCard
              label="Équité Totale"
              value={`$${totals.equity.toFixed(2)}`}
              icon={<BarChart3 className="text-green-400" size={32} />}
            />
            <StatCard
              label="P&L Jour"
              value={`$${totals.dailyPnL.toFixed(2)}`}
              color={totals.dailyPnL >= 0 ? 'green' : 'red'}
              icon={
                totals.dailyPnL >= 0 ? (
                  <TrendingUp className="text-green-400" size={32} />
                ) : (
                  <TrendingDown className="text-red-400" size={32} />
                )
              }
            />
            <StatCard
              label="Drawdown Moyen"
              value={`${totalDrawdown}%`}
              color="yellow"
              icon={<BarChart3 className="text-yellow-400" size={32} />}
            />
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-6 mb-8 shadow-lg animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? '✏️ Modifier le compte' : '➕ Nouveau compte'}
            </h2>

            <form onSubmit={handleAddAccount} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom du compte */}
                <FormInput
                  label="Nom du compte"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: FTMO Live #1"
                  required
                />

                {/* Plateforme */}
                <div>
                  <label className="block text-slate-300 font-medium mb-2">Plateforme</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'ftmo' | 'lucid' })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none transition hover:border-slate-500"
                  >
                    <option value="ftmo">FTMO Trading (CFD)</option>
                    <option value="lucid">Lucid Trading (Futures)</option>
                  </select>
                </div>

                <FormInput
                  label="Balance ($)"
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  required
                />

                <FormInput
                  label="Équité ($)"
                  type="number"
                  value={formData.equity}
                  onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  required
                />

                <FormInput
                  label="Drawdown (%)"
                  type="number"
                  value={formData.drawdown}
                  onChange={(e) => setFormData({ ...formData, drawdown: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                />

                <FormInput
                  label="P&L Jour ($)"
                  type="number"
                  value={formData.dailyPnL}
                  onChange={(e) => setFormData({ ...formData, dailyPnL: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                />

                <FormInput
                  label="Win Rate (%)"
                  type="number"
                  value={formData.winRate}
                  onChange={(e) => setFormData({ ...formData, winRate: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                />

                <FormInput
                  label="Total Trades"
                  type="number"
                  value={formData.totalTrades}
                  onChange={(e) => setFormData({ ...formData, totalTrades: e.target.value })}
                  placeholder="0"
                />

                {/* API Key */}
                <div className="md:col-span-2">
                  <label className="block text-slate-300 font-medium mb-2">Clé API (optionnel)</label>
                  <div className="relative">
                    <input
                      type={formData.showApiKey ? 'text' : 'password'}
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      placeholder="Votre clé API..."
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 pr-12 focus:border-blue-500 focus:outline-none transition hover:border-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, showApiKey: !formData.showApiKey })}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                    >
                      {formData.showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  {editingId ? '💾 Mettre à jour' : '➕ Ajouter le compte'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  ❌ Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Comptes FTMO */}
        {ftmoAccounts.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-white">📊 FTMO Trading</h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {ftmoAccounts.length}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {ftmoAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  platform="ftmo"
                />
              ))}
            </div>
          </div>
        )}

        {/* Comptes Lucid */}
        {lucidAccounts.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-white">🚀 Lucid Trading</h2>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {lucidAccounts.length}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {lucidAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  platform="lucid"
                />
              ))}
            </div>
          </div>
        )}

        {/* État vide */}
        {accounts.length === 0 && !showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-12 text-center animate-fade-in">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun compte pour le moment</h3>
            <p className="text-slate-400 mb-6">Ajoutez votre premier compte FTMO ou Lucid Trading</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
            >
              ➕ Ajouter un compte
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Trading Dashboard. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

// Composant StatCard
function StatCard({
  label,
  value,
  icon,
  color = 'blue'
}: {
  label: string
  value: string
  icon: React.ReactNode
  color?: string
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition hover:border-slate-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  )
}

// Composant FormInput
function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  step,
  required
}: {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  step?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-slate-300 font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        required={required}
        className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none transition hover:border-slate-500 placeholder-slate-500"
      />
    </div>
  )
}

// Composant AccountCard
function AccountCard({
  account,
  onEdit,
  onDelete,
  platform
}: {
  account: Account
  onEdit: (account: Account) => void
  onDelete: (id: number) => void
  platform: 'ftmo' | 'lucid'
}) {
  const platformColor = platform === 'ftmo' ? 'blue' : 'orange'
  const platformLabel = platform === 'ftmo' ? 'FTMO' : 'Lucid'
  const bgGradient = platform === 'ftmo' ? 'from-blue-900/20' : 'from-orange-900/20'

  return (
    <div className={`bg-gradient-to-br ${bgGradient} to-slate-700 border border-${platformColor}-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition hover:border-${platformColor}-500`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{account.name}</h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-${platformColor}-600 text-white mt-2 inline-block`}>
            {platformLabel}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(account)}
            className="p-2 bg-slate-700/60 hover:bg-slate-600 text-blue-400 hover:text-blue-300 rounded-lg transition"
            title="Éditer"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="p-2 bg-slate-700/60 hover:bg-slate-600 text-red-400 hover:text-red-300 rounded-lg transition"
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <StatItem label="Balance" value={`$${parseFloat(account.balance || '0').toFixed(2)}`} />
        <StatItem label="Équité" value={`$${parseFloat(account.equity || '0').toFixed(2)}`} />
        <StatItem label="Drawdown" value={`${parseFloat(account.drawdown || '0').toFixed(2)}%`} color="warning" />
        <StatItem
          label="P&L Jour"
          value={`$${parseFloat(account.dailyPnL || '0').toFixed(2)}`}
          color={parseFloat(account.dailyPnL || '0') >= 0 ? 'success' : 'danger'}
        />
        <StatItem label="Win Rate" value={`${parseFloat(account.winRate || '0').toFixed(2)}%`} />
        <StatItem label="Trades" value={account.totalTrades || '0'} />
      </div>

      {/* API Key */}
      {account.apiKey && (
        <div className="pt-4 border-t border-slate-600">
          <p className="text-slate-400 text-xs">
            🔑 API: {account.apiKey.slice(0, 4)}...{account.apiKey.slice(-4)}
          </p>
        </div>
      )}
    </div>
  )
}

// Composant StatItem
function StatItem({
  label,
  value,
  color = 'neutral'
}: {
  label: string
  value: string
  color?: string
}) {
  const colorClasses: Record<string, string> = {
    neutral: 'text-slate-300',
    success: 'text-green-400',
    danger: 'text-red-400',
    warning: 'text-yellow-400'
  }

  return (
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-lg font-bold mt-1 ${colorClasses[color]}`}>{value}</p>
    </div>
  )
}
