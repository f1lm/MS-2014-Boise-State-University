import java.io.File;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;


/**
 * 
 * Plays a sound sample and waits for it to finish
 *
 */
public class PlayMusic
{	
	public static void main(String[] args) throws InterruptedException
	{
		    try {
		    	File soundFile = new File("sounds/classical.wav").getAbsoluteFile();
		        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(soundFile);
		        Clip clip = AudioSystem.getClip();
		        clip.open(audioInputStream);
		        clip.start();
		        
		    } catch(Exception e) {
		        System.out.println("PlayMusic: Error with playing sound:" + e);
		        e.printStackTrace();
		    }
		    
		    // there are better ways of waiting for a song to finish playing
		    // but we will see them later
		    int playTime = 30; // seconds
		    for (int i = 0; i < playTime * 10; i++) {
		        Thread.sleep(100); // in millisecs
		    	System.out.print("Playing: classical:   " + i/10.0 + "\r");
		    }
	}
}

