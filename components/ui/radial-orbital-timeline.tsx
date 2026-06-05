"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const autoRotateRef = useRef<boolean>(true);
  const angleRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion.current) {
      autoRotateRef.current = false;
    }
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      if (!prefersReducedMotion.current) {
        autoRotateRef.current = true;
      }
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        autoRotateRef.current = false;

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        if (!prefersReducedMotion.current) {
          autoRotateRef.current = true;
        }
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!mounted) return;

    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (autoRotateRef.current) {
        // ~6 degrees per second for smooth rotation
        angleRef.current = (angleRef.current + deltaTime * 0.006) % 360;
      } else if (activeNodeId !== null) {
        const nodeIndex = timelineData.findIndex((item) => item.id === activeNodeId);
        if (nodeIndex !== -1) {
          const targetAngle = 270 - (nodeIndex / timelineData.length) * 360;
          let diff = targetAngle - angleRef.current;
          
          while (diff > 180) diff -= 360;
          while (diff < -180) diff += 360;

          if (prefersReducedMotion.current || Math.abs(diff) < 0.1) {
            angleRef.current = targetAngle;
          } else {
            angleRef.current += diff * 0.08;
          }
        }
      }

      // Batch DOM updates
      timelineData.forEach((item, index) => {
        const node = nodeRefs.current[item.id];
        if (node) {
          const initialAngle = (index / timelineData.length) * 360;
          const currentAngle = (initialAngle + angleRef.current) % 360;
          const radius = 200;

          // GPU-accelerated rotation positioning
          node.style.transform = `rotate(${currentAngle}deg) translateX(${radius}px) rotate(-${currentAngle}deg) translateZ(0)`;

          const radian = (currentAngle * Math.PI) / 180;
          const zIndex = Math.round(100 + 50 * Math.cos(radian));
          const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

          // Apply depth
          node.style.zIndex = zIndex.toString();
          if (activeNodeId !== item.id) {
            node.style.opacity = opacity.toString();
          } else {
            node.style.opacity = "1";
            node.style.zIndex = "200";
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, activeNodeId, timelineData]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px", transform: "translateZ(0)" }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center z-10" style={{ transform: "translateZ(0)", animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}>
            <div className="absolute w-20 h-20 rounded-full border border-white/20 opacity-70" style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}></div>
            <div className="absolute w-24 h-24 rounded-full border border-white/10 opacity-50" style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite", animationDelay: "0.5s" }}></div>
            <div className="w-8 h-8 rounded-full bg-white/80"></div>
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-white/10" style={{ transform: "translateZ(0)" }}></div>

          {mounted && timelineData.map((item) => {
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{ willChange: "transform, opacity, z-index" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    transform: "translateZ(0)"
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black scale-150 shadow-lg shadow-white/30"
                      : isRelated
                      ? "bg-white/50 text-black border-white animate-pulse"
                      : "bg-black text-white border-white/40"
                  }
                  border-2 
                  transition-all duration-300 transform
                `}
                  style={{ transform: isExpanded ? "scale(1.5) translateZ(0)" : "translateZ(0)" }}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap

                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] bg-[#111111] border-white/30 shadow-2xl overflow-visible" style={{ transform: "translate(-50%, 0) translateZ(0)" }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader 
                      className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5"
                      style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}
                    >
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0.5 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-3 leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent 
                      className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8 sm:pt-0 text-xs text-white/80 leading-relaxed"
                      style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}
                    >
                      <p>{item.content}</p>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1.5" />
                            Progress
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <div className="flex items-center mb-3">
                            <Link size={10} className="text-white/70 mr-1.5" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-7 px-2.5 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1.5 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
