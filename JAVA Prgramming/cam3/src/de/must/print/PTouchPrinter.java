/*
 * Copyright (c) 2008 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.print;

import java.io.IOException;

import de.must.io.Logger;

/**
 * Printer class to print on Brother P-touch 2420PC via 'BrssCom.Document'.
 * Works only on local printer.
 * Needs PrintOnPTouch.exe and vbrun60.exe / Installation of bpacsdk156eu.exe
 * 'msiexec /jm BrssCom.msm' or 'msiexec /i BrssCom.msm' is not the right thing for msm files
 * Visual Studio 6.0 Installer must be installed instead to install BrssCom.msm
 * @author Christoph Mueller
 * @deprecated too proprietary, runtime too complicated - what we want is support a suitable support of standard windows printing
 */
public class PTouchPrinter {
  
  /**
   * Prints text on layout (template) as specified.
   * @param layoutName the name of the layout to use (without file extension .lbl)
   * @param text the text to fill into placeholders text1, text2,...
   */
  public void print(String layoutName, String[] text) {
    print("./bin/", layoutName, text);
  }
  
  /**
   * Prints text on layout (template) as specified.
   * @param exeDir the directory of the exe file other than './bin/'
   * @param layoutName the name of the layout to use (without file extension .lbl)
   * @param text the text to fill into placeholders text1, text2,...
   */
  public void print(String exePath, String layoutName, String[] text) {
    String commandLine = exePath + "PrintOnPTouch.exe " + System.getProperty("user.dir") + "\\" + layoutName + ".lbl";
    for (int i = 0; i < text.length; i++) {
      commandLine += ";" + text[i];
    }
    try {
      Runtime.getRuntime().exec(commandLine);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }

  }

}

/* Visual Basic Code of PrintOnPTouch.exe
Module Module1

    Sub Main()
        Dim args As String
        Dim argCount As Integer
        Dim counter As Integer
        Dim pos As Integer

        args = Command()
        argCount = 0
        For i = 1 To Len(args)
            If Mid$(args, i, 1) = ";" Then argCount = argCount + 1
        Next

        Dim argArr(argCount) As String

        pos = InStr(args, ";")

        While (pos > 0)
            argArr(counter) = Left(args, pos - 1)
            pos = InStr(args, ";")
            args = Mid(args, pos + 1, Len(args))
            pos = InStr(args, ";")
            counter = counter + 1
        End While

        argArr(counter) = args 'last element doesn't end with ";"

        'Dim ObjDoc As BrssCom.Document
        Dim ObjDoc As Object
        ObjDoc = CreateObject("BrssCom.Document")
        If (ObjDoc.Open(argArr(0)) <> False) Then
            Dim nIndex As Integer
            For i = 1 To argArr.Length - 1
                nIndex = ObjDoc.GetTextIndex("Text" & i)
                ObjDoc.SetText(nIndex, argArr(i))
            Next
            ObjDoc.DoPrint(1, "0")  ' Print
        Else
            MsgBox(argArr(0) & " not found")
        End If
        ObjDoc = Nothing
    End Sub

End Module
*/