package socialnetworking.queue;

public interface WorkItem {
	public boolean process() throws Exception;
}
