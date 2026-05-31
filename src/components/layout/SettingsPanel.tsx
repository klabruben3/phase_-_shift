"use client";

import { ArrowLeft, Volume2, Monitor, Gamepad2, Bell, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Screen } from "../../game/types";

interface SettingsPanelProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function SettingsPanel({ onNavigate }: SettingsPanelProps) {
  const settingsSections = [
    {
      title: "AUDIO",
      icon: Volume2,
      settings: [
        { label: "MASTER", type: "slider", value: 80 },
        { label: "MUSIC", type: "slider", value: 60 },
        { label: "SFX", type: "slider", value: 90 },
        { label: "VOICE", type: "toggle", value: true },
      ]
    },
    {
      title: "GRAPHICS",
      icon: Monitor,
      settings: [
        { label: "QUALITY", type: "select", value: "HIGH", options: ["LOW", "MEDIUM", "HIGH", "ULTRA"] },
        { label: "PARTICLES", type: "toggle", value: true },
        { label: "SHAKE", type: "toggle", value: true },
        { label: "FPS", type: "toggle", value: false },
      ]
    },
    {
      title: "CONTROLS",
      icon: Gamepad2,
      settings: [
        { label: "SCHEME", type: "select", value: "WASD", options: ["WASD", "ARROWS", "CUSTOM"] },
        { label: "SENSITIVITY", type: "slider", value: 50 },
        { label: "VIBRATION", type: "toggle", value: true },
        { label: "AUTO-RUN", type: "toggle", value: false },
      ]
    },
    {
      title: "GAMEPLAY",
      icon: User,
      settings: [
        { label: "TUTORIAL", type: "toggle", value: false },
        { label: "SPECTATE", type: "toggle", value: true },
        { label: "CHAT FILTER", type: "toggle", value: true },
        { label: "REQUESTS", type: "toggle", value: true },
      ]
    },
    {
      title: "NOTIFICATIONS",
      icon: Bell,
      settings: [
        { label: "INVITES", type: "toggle", value: true },
        { label: "ONLINE", type: "toggle", value: true },
        { label: "ACHIEVEMENTS", type: "toggle", value: true },
        { label: "NEWS", type: "toggle", value: false },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <button
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span style={{ fontFamily: 'monospace' }}>BACK</span>
          </button>
          <h2 style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>SETTINGS</h2>
          <div className="w-20" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                <h3 style={{ fontFamily: 'monospace', letterSpacing: '0.1em', fontSize: '0.875rem' }}>{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <label className="text-foreground" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{setting.label}</label>

                    {setting.type === "toggle" && (
                      <button
                        className={`relative h-6 w-11 border transition-colors ${
                          setting.value ? "border-primary bg-primary" : "border-border bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 bg-white transition-transform ${
                            setting.value ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    )}

                    {setting.type === "slider" && (
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={setting.value}
                          className="h-1 w-48 cursor-pointer appearance-none bg-muted [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary"
                        />
                        <span className="w-12 text-right text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                          {setting.value}%
                        </span>
                      </div>
                    )}

                    {setting.type === "select" && (
                      <select className="border border-border bg-input px-3 py-2 text-foreground focus:border-primary focus:outline-none" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {setting.options?.map((option) => (
                          <option key={option} value={option} selected={option === setting.value}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 border border-border bg-card px-4 py-3 transition-colors hover:bg-muted" style={{ fontFamily: 'monospace' }}>
              RESET
            </button>
            <button className="flex-1 border border-primary bg-primary px-4 py-3 text-primary-foreground transition-all hover:bg-transparent hover:text-primary" style={{ fontFamily: 'monospace' }}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
