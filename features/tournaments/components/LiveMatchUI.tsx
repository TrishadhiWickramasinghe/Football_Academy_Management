"use client"

import { Clock, Square, Goal, ArrowRightLeft, ShieldAlert } from "lucide-react"

export function LiveMatchUI() {
  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6 flex items-center justify-between relative overflow-hidden">
        {/* Pulsing LIVE indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-2 py-0.5 rounded text-xs font-bold tracking-widest animate-pulse shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
          LIVE
        </div>
        
        <div className="absolute top-4 right-4 text-sm font-semibold opacity-80">
          Semi Final
        </div>

        <div className="w-full flex justify-between items-center mt-6">
          <div className="flex flex-col items-center gap-3 w-1/3">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm text-xl font-bold">O</div>
            <span className="font-bold text-lg text-center leading-tight">OPA U15</span>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2 w-1/3">
            <div className="flex items-center gap-4 text-4xl md:text-5xl font-black tabular-nums tracking-tight">
              <span>2</span>
              <span className="text-white/50 text-3xl">-</span>
              <span>1</span>
            </div>
            <div className="flex items-center gap-1.5 text-warning bg-warning/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm border border-warning/30">
              <Clock className="h-4 w-4" /> 72:14
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-1/3">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm text-xl font-bold">M</div>
            <span className="font-bold text-lg text-center leading-tight">Mexico City FC</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Match Events</h4>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          {/* Goal OPA */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-end w-full md:w-1/2 md:pr-8 md:group-odd:pr-0 md:group-odd:justify-start md:group-odd:pl-8">
              <div className="bg-success/10 border border-success/20 px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm w-[90%] justify-between">
                <div>
                  <span className="font-bold text-success block">Goal</span>
                  <span className="text-muted-foreground text-xs">M. Hernandez</span>
                </div>
                <Goal className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-success text-success-foreground z-10 shadow-sm font-bold text-xs">
              68'
            </div>
          </div>

          {/* Yellow Card Mexico City */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-end w-full md:w-1/2 md:pr-8 md:group-odd:pr-0 md:group-odd:justify-start md:group-odd:pl-8">
              <div className="bg-warning/10 border border-warning/20 px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm w-[90%] justify-between flex-row-reverse md:group-odd:flex-row">
                <div className="text-right md:group-odd:text-left">
                  <span className="font-bold text-warning block">Yellow Card</span>
                  <span className="text-muted-foreground text-xs">J. Silva</span>
                </div>
                <Square className="h-5 w-5 fill-warning text-warning" />
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-warning text-warning-foreground z-10 shadow-sm font-bold text-xs">
              45'
            </div>
          </div>

          {/* Goal Mexico City */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-end w-full md:w-1/2 md:pr-8 md:group-odd:pr-0 md:group-odd:justify-start md:group-odd:pl-8">
              <div className="bg-success/10 border border-success/20 px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm w-[90%] justify-between flex-row-reverse md:group-odd:flex-row">
                <div className="text-right md:group-odd:text-left">
                  <span className="font-bold text-success block">Goal</span>
                  <span className="text-muted-foreground text-xs">R. Garcia</span>
                </div>
                <Goal className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-success text-success-foreground z-10 shadow-sm font-bold text-xs">
              22'
            </div>
          </div>
          
           {/* Goal OPA */}
           <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-end w-full md:w-1/2 md:pr-8 md:group-odd:pr-0 md:group-odd:justify-start md:group-odd:pl-8">
              <div className="bg-success/10 border border-success/20 px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm w-[90%] justify-between">
                <div>
                  <span className="font-bold text-success block">Goal</span>
                  <span className="text-muted-foreground text-xs">M. Hernandez</span>
                </div>
                <Goal className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-success text-success-foreground z-10 shadow-sm font-bold text-xs">
              12'
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
