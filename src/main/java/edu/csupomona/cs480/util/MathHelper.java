package edu.csupomona.cs480.util;
import org.apache.commons.math3.stat.StatUtils;

/**
 * Created by william on 10/20/16.
 */
public class MathHelper {
    public double getAverage(final double [] arr) {
        return StatUtils.mean(arr);
    }

    public double percentIncrease(final double fromNum, final double toNum) {
        double increase = ((fromNum / toNum) - 1) * (toNum / fromNum) * -1;
        return increase * 100;
    }

}
