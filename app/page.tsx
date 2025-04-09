import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";

export default function AgentsPage() {
  return (
    <ChatWindow
      endpoint="api/chat/agents"
      emptyStateComponent={null}
      placeholder="Use me to generate a haiku"
      emoji="🦜"
      showIntermediateStepsToggle={false}
    />
  );
}
