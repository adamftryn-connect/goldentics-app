import { TrendingUp, TrendingDown, Minus, Wallet } from 'lucide-react'
import { getRecommendationView } from '../utils/predictionRecommendation.js'

const TREND_ICONS = {
  up: TrendingUp,
  hold: Minus,
  down: TrendingDown,
}

function TrendIcon({ variant, size, className }) {
  const Icon = TREND_ICONS[variant]
  return <Icon size={size} className={className} aria-hidden strokeWidth={2} />
}

function AiRecommendationCard({ result, predictionDays = 7 }) {
  if (!result) {
    return (
      <div className="rec-card">
        <div className="rec-heading">Rekomendasi Untuk Anda</div>
        <p className="rec-placeholder">Rekomendasi akan muncul setelah prediksi berhasil.</p>
      </div>
    )
  }

  const view = getRecommendationView(result, predictionDays)

  return (
    <div className={`rec-card rec-card--${view.variant}`}>
      <div className="rec-heading">Rekomendasi Untuk Anda</div>

      <div className="rec-hero">
        <div className="rec-hero-icon" aria-hidden="true">
          <TrendIcon variant={view.variant} size={40} className="rec-lucide-icon" />
        </div>
        <div className="rec-hero-text">
          <div className="rec-action-title">{view.title}</div>
          <p className="rec-summary">{view.summary}</p>
        </div>
      </div>

      <div className="rec-details">
        <div className="rec-detail-row">
          <div className="rec-detail-icon" aria-hidden="true">
            <TrendIcon variant={view.variant} size={22} className="rec-lucide-icon" />
          </div>
          <div className="rec-detail-text">
            <div className="rec-detail-label">Alasan Utama</div>
            <div className="rec-detail-value">{view.reasonText}</div>
          </div>
        </div>

        <div className="rec-detail-row">
          <div className="rec-detail-icon" aria-hidden="true">
            <TrendIcon variant={view.variant} size={22} className="rec-lucide-icon" />
          </div>
          <div className="rec-detail-text">
            <div className="rec-detail-label">{view.potentialLabel}</div>
            <div className="rec-detail-value">{view.potentialValue}</div>
          </div>
        </div>

        <div className="rec-detail-row">
          <div className="rec-detail-icon rec-detail-icon--wallet" aria-hidden="true">
            <Wallet size={22} className="rec-lucide-icon" strokeWidth={2} />
          </div>
          <div className="rec-detail-text">
            <div className="rec-detail-label">Prediksi Nilai Anda</div>
            <div className="rec-detail-value">{view.predictedValue}</div>
          </div>
        </div>
      </div>

      <div className="confidence">
        <div className="conf-label">Tingkat Kepercayaan Model AI</div>
        <div className="conf-bar-track">
          <div
            className="conf-bar-fill"
            style={{ width: `${Math.round((result.confidence ?? 0) * 100)}%` }}
          />
        </div>
        <div className="conf-pct">{Math.round((result.confidence ?? 0) * 100)}% confidence</div>
      </div>
    </div>
  )
}

export default AiRecommendationCard
