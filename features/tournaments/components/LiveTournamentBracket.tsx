"use client"

import { motion } from "framer-motion"

import { Trophy } from "lucide-react"

const matchVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    }
  })
}

const MatchCard = ({ team1, team2, score1, score2, status, time, i }: any) => (
  <motion.div 
    custom={i}
    initial="hidden"
    animate="visible"
    variants={matchVariants}
    className="bg-card border rounded-lg overflow-hidden shadow-sm hover:border-primary/50 transition-colors w-48 shrink-0 relative"
  >
    <div className="bg-muted px-3 py-1.5 flex justify-between items-center text-xs border-b">
      <span className="font-semibold text-muted-foreground">{time}</span>
      {status === 'LIVE' ? (
        <span className="flex items-center text-destructive font-bold animate-pulse gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span> LIVE
        </span>
      ) : (
        <span className="font-semibold">{status}</span>
      )}
    </div>
    <div className="p-3 space-y-2">
      <div className="flex justify-between items-center">
        <span className={`font-bold text-sm ${score1 > score2 ? '' : 'text-muted-foreground'}`}>{team1}</span>
        <span className={`font-mono font-bold ${score1 > score2 ? '' : 'text-muted-foreground'}`}>{score1}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`font-bold text-sm ${score2 > score1 ? '' : 'text-muted-foreground'}`}>{team2}</span>
        <span className={`font-mono font-bold ${score2 > score1 ? '' : 'text-muted-foreground'}`}>{score2}</span>
      </div>
    </div>
    {/* Connecting lines for bracket (visual abstraction) */}
    <div className="absolute top-1/2 -right-4 w-4 border-b-2 border-border hidden md:block"></div>
  </motion.div>
)

export function LiveTournamentBracket() {

  return (
    <div className="min-w-max pb-8 pt-4">
      <div className="flex gap-16 relative">
        {/* Quarter Finals */}
        <div className="flex flex-col justify-around gap-8">
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Quarter Finals</div>
          <MatchCard team1="Team A" score1="2" team2="Team B" score2="1" status="FT" time="May 25" i={0} />
          <MatchCard team1="Team C" score1="0" team2="Team D" score2="3" status="FT" time="May 25" i={1} />
          <MatchCard team1="Team E" score1="1" team2="Team F" score2="1" status="FT (P)" time="May 25" i={2} />
          <MatchCard team1="Team G" score1="2" team2="Team H" score2="0" status="FT" time="May 25" i={3} />
        </div>

        {/* Semi Finals */}
        <div className="flex flex-col justify-around gap-8 relative">
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Semi Finals</div>
          <MatchCard team1="Team A" score1="1" team2="Team D" score2="2" status="FT" time="May 26" i={4} />
          <MatchCard team1="Team F" score1="2" team2="Team G" score2="1" status="LIVE" time="72'" i={5} />
          
          {/* Vertical connecting lines (desktop only) */}
          <div className="absolute top-[20%] -left-8 h-[25%] border-l-2 border-y-2 border-r-0 border-border rounded-l-lg w-8 hidden md:block z-[-1]"></div>
          <div className="absolute top-[70%] -left-8 h-[25%] border-l-2 border-y-2 border-r-0 border-border rounded-l-lg w-8 hidden md:block z-[-1]"></div>
        </div>

        {/* Final */}
        <div className="flex flex-col justify-center gap-8 relative">
          <div className="text-sm font-bold text-warning uppercase tracking-wider mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4" /> Final
          </div>
          <motion.div 
            custom={6}
            initial="hidden"
            animate="visible"
            variants={matchVariants}
            className="bg-card border-2 border-warning/50 rounded-lg overflow-hidden shadow-lg w-48 shrink-0 relative"
          >
            <div className="bg-warning/10 px-3 py-1.5 flex justify-between items-center text-xs border-b border-warning/20">
              <span className="font-bold text-warning-foreground">May 28</span>
              <span className="font-semibold text-warning-foreground">18:00</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-muted-foreground">Team D</span>
                <span className="font-mono font-bold text-muted-foreground">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-muted-foreground">TBD</span>
                <span className="font-mono font-bold text-muted-foreground">-</span>
              </div>
            </div>
          </motion.div>
          
          {/* Vertical connecting line */}
          <div className="absolute top-[35%] -left-8 h-[30%] border-l-2 border-y-2 border-r-0 border-border rounded-l-lg w-8 hidden md:block z-[-1]"></div>
        </div>
      </div>
    </div>
  )
}
