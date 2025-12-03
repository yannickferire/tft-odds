'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import { Champion } from '@/types/champion';
import ChampionSelector from './champion-selector';
import LevelSelector from './level-selector';
import GoldSelector from './gold-selector';
import CopiesOwnedSelector from './copies-owned-selector';
import ContestationSlider from './contestation-slider';
import OtherCostOutSlider from './other-cost-out-slider';
import CustomTooltip from './chart-tooltip';
import ShopStats from './shop-stats';
import ExpectedRollsStat from './expected-rolls-stat';
import CopiesStats from './copies-stats';
import ChartLegend from './chart-legend';
import UnlockableChampionsButton from './unlockable-champions-button';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lightenColor } from '@/utils/rolling-odds-utils';
import { useRollingOddsState } from './hooks/useRollingOddsState';
import { chartConfig, chartMargins, chartDimensions } from './config/chart-config';

interface LineChart2Props {
  champions: Champion[];
  selectedChampion: Champion | null;
  setSelectedChampion: (champion: Champion | null) => void;
}

export default function LineChart2({ champions, selectedChampion: externalSelectedChampion, setSelectedChampion: externalSetSelectedChampion }: LineChart2Props) {
  const {
    selectedChampion,
    setSelectedChampion,
    unlockedChampions,
    setUnlockedChampions,
    level,
    setLevel,
    maxGold,
    setMaxGold,
    copiesOwned,
    setCopiesOwned,
    contestationLevel,
    setContestationLevel,
    otherCostOutLevel,
    setOtherCostOutLevel,
    userPrefer1Star,
    setUserPrefer1Star,
    userPrefer2Star,
    setUserPrefer2Star,
    userPrefer3Star,
    setUserPrefer3Star,
    show1Star,
    show2Star,
    show3Star,
    is1StarDisabled,
    is2StarDisabled,
    is3StarDisabled,
    maxCopiesForCost,
    contestedCopies,
    otherCostOut,
    oddsData,
    xAxisTicks,
    isAtDefault,
    handleReset,
    adjustedChampionsByCost,
  } = useRollingOddsState(champions);

  // Initialize internal state from external on first render only
  React.useEffect(() => {
    if (externalSelectedChampion && !selectedChampion) {
      setSelectedChampion(externalSelectedChampion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync internal changes to external (one-way sync)
  React.useEffect(() => {
    if (selectedChampion && selectedChampion !== externalSelectedChampion) {
      externalSetSelectedChampion(selectedChampion);
    }
  }, [selectedChampion, externalSelectedChampion, externalSetSelectedChampion]);

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full bg-black/20 backdrop-blur-xl border-0 border-t-2 border-b-2 border-white/10 rounded-none text-neutral-50">
        <CardHeader className="border-0 min-h-auto pt-6 pb-4 flex flex-col gap-3">
          <CardTitle className="text-lg font-semibold text-neutral-50 sr-only">Rolling odds probability</CardTitle>
          <div className="flex justify-between gap-4">
            <div className="flex gap-4">
              {/* Level Selector */}
              <LevelSelector level={level} setLevel={setLevel} />

              {/* Gold Selector */}
              <GoldSelector maxGold={maxGold} setMaxGold={setMaxGold} />

              {/* Unlockable Champions Button */}
              <UnlockableChampionsButton
                champions={champions}
                unlockedChampions={unlockedChampions}
                setUnlockedChampions={setUnlockedChampions}
              />
            </div>
            {/* Reset Button */}
            <Button
              onClick={handleReset}
              disabled={isAtDefault}
              variant="outline"
              className="h-12 bg-midnight border-white/10 text-crema hover:bg-black/40 hover:text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title={isAtDefault ? "Already at default values" : "Reset to default values"}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </Button>
          </div>
          <div className="flex gap-4">
          {/* Champion Selector */}
          <ChampionSelector
            champions={champions}
            selectedChampion={selectedChampion}
            setSelectedChampion={setSelectedChampion}
            unlockedChampions={unlockedChampions}
            setUnlockedChampions={setUnlockedChampions}
            setCopiesOwned={setCopiesOwned}
          />

          {/* Copies Owned Selector */}
          {selectedChampion && (
            <CopiesOwnedSelector
              copiesOwned={copiesOwned}
              setCopiesOwned={setCopiesOwned}
              maxCopies={maxCopiesForCost}
            />
          )}

          {/* Contestation Slider */}
          {selectedChampion && (
            <ContestationSlider
              contestationLevel={contestationLevel}
              setContestationLevel={setContestationLevel}
              championCost={selectedChampion.cost}
              playerLevel={level}
              championName={selectedChampion.name}
            />
          )}

          {/* Other Cost Out Slider */}
          {selectedChampion && (
            <OtherCostOutSlider
              otherCostOutLevel={otherCostOutLevel}
              setOtherCostOutLevel={setOtherCostOutLevel}
              championCost={selectedChampion.cost}
              playerLevel={level}
            />
          )}
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {/* Stats Sections */}
          {selectedChampion && (
            <div className="grid grid-cols-4 gap-4">
              <ShopStats level={level} cost={selectedChampion.cost} setLevel={setLevel} />
              <ExpectedRollsStat
                level={level}
                cost={selectedChampion.cost}
                copiesOwned={copiesOwned}
                contestedCopies={contestedCopies}
                otherCostOut={otherCostOut}
                adjustedChampionsByCost={adjustedChampionsByCost}
              />
              <CopiesStats
                championName={selectedChampion.name}
                cost={selectedChampion.cost}
                copiesOwned={copiesOwned}
                contestedCopies={contestedCopies}
                otherCostOut={otherCostOut}
                adjustedChampionsByCost={adjustedChampionsByCost}
              />
            </div>
          )}

          {/* Chart */}
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="h-[400px] w-full ps-1.5 pe-2.5 overflow-visible [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
            >
              <ComposedChart
                data={oddsData}
                margin={chartMargins}
                style={{ overflow: 'visible' }}
              >
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient1Star" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartConfig.probability.color} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={chartConfig.probability.color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradient2Star" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartConfig.probability2Star.color} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={chartConfig.probability2Star.color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradient3Star" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartConfig.probability3Star.color} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={chartConfig.probability3Star.color} stopOpacity={0} />
                  </linearGradient>
                  <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" />
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 12"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeOpacity={1}
                  horizontal={true}
                  vertical={false}
                />

                <XAxis
                  dataKey="goldSpent"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#a3a3a3' }}
                  tickMargin={5}
                  dy={10}
                  domain={[0, maxGold]}
                  ticks={xAxisTicks}
                  label={{ value: 'Gold spent in reroll', position: 'insideBottom', offset: -22, fill: '#a3a3a3' }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#a3a3a3' }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                  tickCount={6}
                  tickMargin={12}
                  label={{ value: 'Probability to hit', angle: -90, position: 'insideLeft', fill: '#a3a3a3' }}
                />

                <ChartTooltip
                  content={<CustomTooltip show1Star={show1Star} show2Star={show2Star} show3Star={show3Star} />}
                  cursor={{
                    stroke: '#ffffd2',
                    strokeWidth: 1,
                    strokeDasharray: 'none',
                  }}
                />

                {/* 1 Star - Gradient area */}
                {show1Star && (
                  <Area
                    type="linear"
                    dataKey="probability"
                    stroke="transparent"
                    fill="url(#gradient1Star)"
                    strokeWidth={0}
                    dot={false}
                  />
                )}

                {/* 2 Star - Gradient area */}
                {show2Star && (
                  <Area
                    type="linear"
                    dataKey="probability2Star"
                    stroke="transparent"
                    fill="url(#gradient2Star)"
                    strokeWidth={0}
                    dot={false}
                  />
                )}

                {/* 3 Star - Gradient area */}
                {show3Star && (
                  <Area
                    type="linear"
                    dataKey="probability3Star"
                    stroke="transparent"
                    fill="url(#gradient3Star)"
                    strokeWidth={0}
                    dot={false}
                  />
                )}

                {/* 1 Star - Line */}
                {show1Star && (
                  <Line
                    type="linear"
                    dataKey="probability"
                    stroke={chartConfig.probability.color}
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.goldSpent > 0 && payload.goldSpent % 10 === 0) {
                        return (
                          <circle
                            key={`dot-1star-${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={chartConfig.probability.color}
                            stroke={lightenColor(chartConfig.probability.color, 20)}
                            strokeWidth={2}
                            filter="url(#dotShadow)"
                          />
                        );
                      }
                      return <g key={`dot-1star-${cx}-${cy}`} />;
                    }}
                    activeDot={{
                      r: 6,
                      fill: chartConfig.probability.color,
                      stroke: lightenColor(chartConfig.probability.color, 20),
                      strokeWidth: 2,
                      filter: 'url(#dotShadow)',
                    }}
                  />
                )}

                {/* 2 Star - Line */}
                {show2Star && (
                  <Line
                    type="linear"
                    dataKey="probability2Star"
                    stroke={chartConfig.probability2Star.color}
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.goldSpent > 0 && payload.goldSpent % 10 === 0) {
                        return (
                          <circle
                            key={`dot-2star-${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={chartConfig.probability2Star.color}
                            stroke={lightenColor(chartConfig.probability2Star.color, 20)}
                            strokeWidth={2}
                            filter="url(#dotShadow)"
                          />
                        );
                      }
                      return <g key={`dot-2star-${cx}-${cy}`} />;
                    }}
                    activeDot={{
                      r: 6,
                      fill: chartConfig.probability2Star.color,
                      stroke: lightenColor(chartConfig.probability2Star.color, 20),
                      strokeWidth: 2,
                      filter: 'url(#dotShadow)',
                    }}
                  />
                )}

                {/* 3 Star - Line */}
                {show3Star && (
                  <Line
                    type="linear"
                    dataKey="probability3Star"
                    stroke={chartConfig.probability3Star.color}
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.goldSpent > 0 && payload.goldSpent % 10 === 0) {
                        return (
                          <circle
                            key={`dot-3star-${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={chartConfig.probability3Star.color}
                            stroke={lightenColor(chartConfig.probability3Star.color, 20)}
                            strokeWidth={2}
                            filter="url(#dotShadow)"
                          />
                        );
                      }
                      return <g key={`dot-3star-${cx}-${cy}`} />;
                    }}
                    activeDot={{
                      r: 6,
                      fill: chartConfig.probability3Star.color,
                      stroke: lightenColor(chartConfig.probability3Star.color, 20),
                      strokeWidth: 2,
                      filter: 'url(#dotShadow)',
                    }}
                  />
                )}
              </ComposedChart>
            </ChartContainer>
          </div>

          {/* Chart Legend */}
          <ChartLegend
            userPrefer1Star={userPrefer1Star}
            userPrefer2Star={userPrefer2Star}
            userPrefer3Star={userPrefer3Star}
            setUserPrefer1Star={setUserPrefer1Star}
            setUserPrefer2Star={setUserPrefer2Star}
            setUserPrefer3Star={setUserPrefer3Star}
            is1StarDisabled={is1StarDisabled}
            is2StarDisabled={is2StarDisabled}
            is3StarDisabled={is3StarDisabled}
            show1Star={show1Star}
            show2Star={show2Star}
            show3Star={show3Star}
            copiesOwned={copiesOwned}
          />
        </CardContent>
      </Card>
    </div>
  );
}
