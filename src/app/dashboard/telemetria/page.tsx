'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import MachineMapPlaceholder from '@/components/telemetry/MachineMapPlaceholder'
import MachineSelector from '@/components/telemetry/MachineSelector'
import EngineStatus from '@/components/telemetry/EngineStatus'
import TelemetryGauge from '@/components/telemetry/TelemetryGauge'
import FuelChart from '@/components/telemetry/FuelChart'
import DailyReportTable from '@/components/telemetry/DailyReportTable'
import { demoTelemetry, demoTelemetryHistory, demoDailyReports } from '@/lib/data/telemetry'
import { formatDateTime } from '@/lib/utils/dates'

export default function TelemetriaPage() {
  const [selectedId, setSelectedId] = useState(demoTelemetry[0].machinery_id)

  const selected = useMemo(
    () => demoTelemetry.find((t) => t.machinery_id === selectedId) || demoTelemetry[0],
    [selectedId]
  )

  const machines = demoTelemetry.map((t) => ({
    id: t.machinery_id,
    name: t.machinery_name,
    image: t.machinery_image,
    engine_on: t.engine_on,
    fuel_level: t.fuel_level,
  }))

  const mapMachines = demoTelemetry.map((t) => ({
    id: t.machinery_id,
    name: t.machinery_name,
    latitude: t.latitude,
    longitude: t.longitude,
    engine_on: t.engine_on,
  }))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Monitor de telemetría
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Seguimiento en tiempo real de tus maquinarias alquiladas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar — Machine selector */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <MachineSelector
            machines={machines}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </motion.div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <MachineMapPlaceholder
              machines={mapMachines}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </motion.div>

          {/* Selected machine header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="font-display text-lg font-bold text-kargo-text uppercase">
                {selected.machinery_name}
              </h2>
              <p className="text-xs text-kargo-muted">
                Última actualización: {formatDateTime(selected.timestamp)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-kargo-steel">
                {selected.latitude.toFixed(4)}°, {selected.longitude.toFixed(4)}°
              </span>
            </div>
          </motion.div>

          {/* Engine + Gauges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <EngineStatus isOn={selected.engine_on} engineHours={selected.engine_hours} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <TelemetryGauge
              label="Combustible"
              value={selected.fuel_level}
              max={100}
              unit="%"
              color={selected.fuel_level < 30 ? 'red' : 'green'}
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
              }
            />
            <TelemetryGauge
              label="Velocidad"
              value={selected.speed_kmh}
              max={15}
              unit="km/h"
              color="blue"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
            />
            <TelemetryGauge
              label="Horas motor"
              value={selected.engine_hours}
              max={2000}
              unit="hrs"
              color="yellow"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <TelemetryGauge
              label="Consumo total"
              value={selected.fuel_consumption_liters}
              max={500}
              unit="L"
              color="yellow"
              showBar={false}
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              }
            />
          </motion.div>

          {/* Fuel chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <FuelChart data={demoTelemetryHistory} />
          </motion.div>

          {/* Daily report */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DailyReportTable reports={demoDailyReports} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
