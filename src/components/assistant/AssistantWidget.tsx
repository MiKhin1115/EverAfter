import { ChatWidget } from './ChatWidget'

type AssistantWidgetProps = {
  enabled: boolean
  open: boolean
  onOpenChange: (next: boolean) => void
  onNavigate: (path: string) => void
  isHomeView: boolean
}

export function AssistantWidget(props: AssistantWidgetProps) {
  return <ChatWidget {...props} />
}
