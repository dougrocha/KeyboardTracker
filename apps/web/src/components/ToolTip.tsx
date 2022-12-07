import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react-dom-interactions"
import React from "react"
import { mergeRefs } from "react-merge-refs"

interface useTooltipProps {
  initialOpen?: boolean
  placement?: "top" | "bottom" | "left" | "right"
  delay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const useTooltip = ({
  initialOpen = false,
  placement = "top",
  delay,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: useTooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  })

  const context = data.context

  const hover = useHover(context, {
    move: false,
    delay,
    enabled: controlledOpen == null,
  })
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return React.useMemo(
    () => ({ open, setOpen, ...data, ...interactions }),
    [open, setOpen, data, interactions]
  )
}

export const useTooltipState = () => {
  const context = React.useContext(TooltipContext)

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />")
  }

  return context
}

type TooltipContextType = ReturnType<typeof useTooltip>

const TooltipContext = React.createContext<TooltipContextType | null>(null)

const ToolTip = ({
  children,
  ...options
}: { children: React.ReactNode } & useTooltipProps) => {
  const tooltip = useTooltip(options)

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  )
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(({ children, asChild = false, ...props }, propRef) => {
  const state = useTooltipState()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref

  const ref = React.useMemo(
    () => mergeRefs([state.reference, propRef, childrenRef]),
    [state.reference, propRef, childrenRef]
  )

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": state.open ? "open" : "closed",
      })
    )
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={state.open ? "open" : "closed"}
      {...state.getReferenceProps(props)}
    >
      {children}
    </button>
  )
})

TooltipTrigger.displayName = "TooltipTrigger"

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const state = useTooltipState()

  const ref = React.useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )

  return (
    <FloatingPortal>
      {state.open && (
        <div
          ref={ref}
          style={{
            position: state.strategy,
            top: state.y ?? 0,
            left: state.x ?? 0,
            visibility: state.x == null ? "hidden" : "visible",
            ...props.style,
          }}
          {...state.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  )
})

TooltipContent.displayName = "TooltipContent"

export default ToolTip
