import { Cloud } from 'lucide-react'
import React from 'react'

const CalculatorRight = ({calculated, activeTab}) => {
  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Your Carbon Footprint
          </h2>

          {!calculated || activeTab !== "flight" ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
              <Cloud className="h-16 w-16 mb-4" />
              <p className="text-sm">
                {activeTab === "flight"
                  ? "Enter flight details to calculate emissions"
                  : "This calculator is coming soon"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary mt-2">
                      0.95 MT
                    </span>
                  </div>
                  <Cloud className="h-32 w-32 text-primary/40" />
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                From: New York JFK (JFK), To: Dubai International (DXB), 8439
                km, Economy Class
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-4 py-2 bg-muted/30 rounded-md">
                  <span className="text-sm font-medium">Single Flight Emission</span>
                  <span className="font-semibold text-sm">0.95 MT</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-muted/30 rounded-md">
                  <span className="text-sm font-medium">Total CO2 Emission</span>
                  <span className="font-semibold text-sm">0.95 MT</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Take action for a greener future —
                  <br />
                  click here to have more on carbon emission optimization
                </p>
                {/* <button className="w-full bg-primary text-secondary-foreground py-3 rounded-md text-sm font-medium">
                  Optimize
                </button> */}
              </div>
            </div>
          )}
        </div>
    </>
  )
}

export default CalculatorRight
