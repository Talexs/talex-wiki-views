<template>
  <el-tabs class="LayoutCenter-Frame" tab-position="left">
<!--    <el-tab-pane label="项目信息">-->
<!--      <blockquote>-->
<!--        本项目(TalexWiki)的项目信息状况如下：-->
<!--      </blockquote>-->
<!--      <h1>待完成。</h1>-->
<!--    </el-tab-pane>-->
    <el-tab-pane label="协议信息">

    </el-tab-pane>
    <el-tab-pane label="开源信息">

    </el-tab-pane>
    <el-tab-pane label="引用信息">

    </el-tab-pane>
  </el-tabs>
<!--  <el-collapse style="margin-bottom: 30px;border: none">-->
<!--    <el-collapse-item title="项目信息" class="LayoutCenter-Frame">-->

<!--    </el-collapse-item>-->

<!--    <el-collapse-item title="协议信息" class="LayoutCenter-Frame" style="animation-delay: .2s">-->

<!--    </el-collapse-item>-->

<!--    <el-collapse-item title="开源信息" class="LayoutCenter-Frame" style="animation-delay: .4s">-->

<!--&lt;!&ndash;      <div class="reduced-width">&ndash;&gt;-->

<!--&lt;!&ndash;        <hr class="thin">&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; The license text is in English and appears broken in RTL as&ndash;&gt;-->
<!--&lt;!&ndash;             Arabic, Farsi, etc.  Explicitly set the direction to override the&ndash;&gt;-->
<!--&lt;!&ndash;             one defined in the translation. &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div dir="ltr">&ndash;&gt;-->
<!--&lt;!&ndash;          <h3 style="text-align: center;">GNU GENERAL PUBLIC LICENSE</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <p style="text-align: center;">Version 3, 29 June 2007</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Copyright © 2007 Free Software Foundation, Inc.&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;<a href="https://fsf.org/">https://fsf.org/</a>&gt;</p><p>&ndash;&gt;-->
<!--&lt;!&ndash;          Everyone is permitted to copy and distribute verbatim copies&ndash;&gt;-->
<!--&lt;!&ndash;          of this license document, but changing it is not allowed.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h4 id="preamble">Preamble</h4>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The GNU General Public License is a free, copyleft license for&ndash;&gt;-->
<!--&lt;!&ndash;            software and other kinds of works.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The licenses for most software and other practical works are designed&ndash;&gt;-->
<!--&lt;!&ndash;            to take away your freedom to share and change the works.  By contrast,&ndash;&gt;-->
<!--&lt;!&ndash;            the GNU General Public License is intended to guarantee your freedom to&ndash;&gt;-->
<!--&lt;!&ndash;            share and change all versions of a program&#45;&#45;to make sure it remains free&ndash;&gt;-->
<!--&lt;!&ndash;            software for all its users.  We, the Free Software Foundation, use the&ndash;&gt;-->
<!--&lt;!&ndash;            GNU General Public License for most of our software; it applies also to&ndash;&gt;-->
<!--&lt;!&ndash;            any other work released this way by its authors.  You can apply it to&ndash;&gt;-->
<!--&lt;!&ndash;            your programs, too.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>When we speak of free software, we are referring to freedom, not&ndash;&gt;-->
<!--&lt;!&ndash;            price.  Our General Public Licenses are designed to make sure that you&ndash;&gt;-->
<!--&lt;!&ndash;            have the freedom to distribute copies of free software (and charge for&ndash;&gt;-->
<!--&lt;!&ndash;            them if you wish), that you receive source code or can get it if you&ndash;&gt;-->
<!--&lt;!&ndash;            want it, that you can change the software or use pieces of it in new&ndash;&gt;-->
<!--&lt;!&ndash;            free programs, and that you know you can do these things.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>To protect your rights, we need to prevent others from denying you&ndash;&gt;-->
<!--&lt;!&ndash;            these rights or asking you to surrender the rights.  Therefore, you have&ndash;&gt;-->
<!--&lt;!&ndash;            certain responsibilities if you distribute copies of the software, or if&ndash;&gt;-->
<!--&lt;!&ndash;            you modify it: responsibilities to respect the freedom of others.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>For example, if you distribute copies of such a program, whether&ndash;&gt;-->
<!--&lt;!&ndash;            gratis or for a fee, you must pass on to the recipients the same&ndash;&gt;-->
<!--&lt;!&ndash;            freedoms that you received.  You must make sure that they, too, receive&ndash;&gt;-->
<!--&lt;!&ndash;            or can get the source code.  And you must show them these terms so they&ndash;&gt;-->
<!--&lt;!&ndash;            know their rights.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Developers that use the GNU GPL protect your rights with two steps:&ndash;&gt;-->
<!--&lt;!&ndash;            (1) assert copyright on the software, and (2) offer you this License&ndash;&gt;-->
<!--&lt;!&ndash;            giving you legal permission to copy, distribute and/or modify it.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>For the developers' and authors' protection, the GPL clearly explains&ndash;&gt;-->
<!--&lt;!&ndash;            that there is no warranty for this free software.  For both users' and&ndash;&gt;-->
<!--&lt;!&ndash;            authors' sake, the GPL requires that modified versions be marked as&ndash;&gt;-->
<!--&lt;!&ndash;            changed, so that their problems will not be attributed erroneously to&ndash;&gt;-->
<!--&lt;!&ndash;            authors of previous versions.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Some devices are designed to deny users access to install or run&ndash;&gt;-->
<!--&lt;!&ndash;            modified versions of the software inside them, although the manufacturer&ndash;&gt;-->
<!--&lt;!&ndash;            can do so.  This is fundamentally incompatible with the aim of&ndash;&gt;-->
<!--&lt;!&ndash;            protecting users' freedom to change the software.  The systematic&ndash;&gt;-->
<!--&lt;!&ndash;            pattern of such abuse occurs in the area of products for individuals to&ndash;&gt;-->
<!--&lt;!&ndash;            use, which is precisely where it is most unacceptable.  Therefore, we&ndash;&gt;-->
<!--&lt;!&ndash;            have designed this version of the GPL to prohibit the practice for those&ndash;&gt;-->
<!--&lt;!&ndash;            products.  If such problems arise substantially in other domains, we&ndash;&gt;-->
<!--&lt;!&ndash;            stand ready to extend this provision to those domains in future versions&ndash;&gt;-->
<!--&lt;!&ndash;            of the GPL, as needed to protect the freedom of users.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Finally, every program is threatened constantly by software patents.&ndash;&gt;-->
<!--&lt;!&ndash;            States should not allow patents to restrict development and use of&ndash;&gt;-->
<!--&lt;!&ndash;            software on general-purpose computers, but in those that do, we wish to&ndash;&gt;-->
<!--&lt;!&ndash;            avoid the special danger that patents applied to a free program could&ndash;&gt;-->
<!--&lt;!&ndash;            make it effectively proprietary.  To prevent this, the GPL assures that&ndash;&gt;-->
<!--&lt;!&ndash;            patents cannot be used to render the program non-free.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The precise terms and conditions for copying, distribution and&ndash;&gt;-->
<!--&lt;!&ndash;            modification follow.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h4 id="terms">TERMS AND CONDITIONS</h4>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section0">0. Definitions.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>“This License” refers to version 3 of the GNU General Public License.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>“Copyright” also means copyright-like laws that apply to other kinds of&ndash;&gt;-->
<!--&lt;!&ndash;            works, such as semiconductor masks.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>“The Program” refers to any copyrightable work licensed under this&ndash;&gt;-->
<!--&lt;!&ndash;            License.  Each licensee is addressed as “you”.  “Licensees” and&ndash;&gt;-->
<!--&lt;!&ndash;            “recipients” may be individuals or organizations.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>To “modify” a work means to copy from or adapt all or part of the work&ndash;&gt;-->
<!--&lt;!&ndash;            in a fashion requiring copyright permission, other than the making of an&ndash;&gt;-->
<!--&lt;!&ndash;            exact copy.  The resulting work is called a “modified version” of the&ndash;&gt;-->
<!--&lt;!&ndash;            earlier work or a work “based on” the earlier work.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A “covered work” means either the unmodified Program or a work based&ndash;&gt;-->
<!--&lt;!&ndash;            on the Program.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>To “propagate” a work means to do anything with it that, without&ndash;&gt;-->
<!--&lt;!&ndash;            permission, would make you directly or secondarily liable for&ndash;&gt;-->
<!--&lt;!&ndash;            infringement under applicable copyright law, except executing it on a&ndash;&gt;-->
<!--&lt;!&ndash;            computer or modifying a private copy.  Propagation includes copying,&ndash;&gt;-->
<!--&lt;!&ndash;            distribution (with or without modification), making available to the&ndash;&gt;-->
<!--&lt;!&ndash;            public, and in some countries other activities as well.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>To “convey” a work means any kind of propagation that enables other&ndash;&gt;-->
<!--&lt;!&ndash;            parties to make or receive copies.  Mere interaction with a user through&ndash;&gt;-->
<!--&lt;!&ndash;            a computer network, with no transfer of a copy, is not conveying.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>An interactive user interface displays “Appropriate Legal Notices”&ndash;&gt;-->
<!--&lt;!&ndash;            to the extent that it includes a convenient and prominently visible&ndash;&gt;-->
<!--&lt;!&ndash;            feature that (1) displays an appropriate copyright notice, and (2)&ndash;&gt;-->
<!--&lt;!&ndash;            tells the user that there is no warranty for the work (except to the&ndash;&gt;-->
<!--&lt;!&ndash;            extent that warranties are provided), that licensees may convey the&ndash;&gt;-->
<!--&lt;!&ndash;            work under this License, and how to view a copy of this License.  If&ndash;&gt;-->
<!--&lt;!&ndash;            the interface presents a list of user commands or options, such as a&ndash;&gt;-->
<!--&lt;!&ndash;            menu, a prominent item in the list meets this criterion.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section1">1. Source Code.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The “source code” for a work means the preferred form of the work&ndash;&gt;-->
<!--&lt;!&ndash;            for making modifications to it.  “Object code” means any non-source&ndash;&gt;-->
<!--&lt;!&ndash;            form of a work.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A “Standard Interface” means an interface that either is an official&ndash;&gt;-->
<!--&lt;!&ndash;            standard defined by a recognized standards body, or, in the case of&ndash;&gt;-->
<!--&lt;!&ndash;            interfaces specified for a particular programming language, one that&ndash;&gt;-->
<!--&lt;!&ndash;            is widely used among developers working in that language.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The “System Libraries” of an executable work include anything, other&ndash;&gt;-->
<!--&lt;!&ndash;            than the work as a whole, that (a) is included in the normal form of&ndash;&gt;-->
<!--&lt;!&ndash;            packaging a Major Component, but which is not part of that Major&ndash;&gt;-->
<!--&lt;!&ndash;            Component, and (b) serves only to enable use of the work with that&ndash;&gt;-->
<!--&lt;!&ndash;            Major Component, or to implement a Standard Interface for which an&ndash;&gt;-->
<!--&lt;!&ndash;            implementation is available to the public in source code form.  A&ndash;&gt;-->
<!--&lt;!&ndash;            “Major Component”, in this context, means a major essential component&ndash;&gt;-->
<!--&lt;!&ndash;            (kernel, window system, and so on) of the specific operating system&ndash;&gt;-->
<!--&lt;!&ndash;            (if any) on which the executable work runs, or a compiler used to&ndash;&gt;-->
<!--&lt;!&ndash;            produce the work, or an object code interpreter used to run it.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The “Corresponding Source” for a work in object code form means all&ndash;&gt;-->
<!--&lt;!&ndash;            the source code needed to generate, install, and (for an executable&ndash;&gt;-->
<!--&lt;!&ndash;            work) run the object code and to modify the work, including scripts to&ndash;&gt;-->
<!--&lt;!&ndash;            control those activities.  However, it does not include the work's&ndash;&gt;-->
<!--&lt;!&ndash;            System Libraries, or general-purpose tools or generally available free&ndash;&gt;-->
<!--&lt;!&ndash;            programs which are used unmodified in performing those activities but&ndash;&gt;-->
<!--&lt;!&ndash;            which are not part of the work.  For example, Corresponding Source&ndash;&gt;-->
<!--&lt;!&ndash;            includes interface definition files associated with source files for&ndash;&gt;-->
<!--&lt;!&ndash;            the work, and the source code for shared libraries and dynamically&ndash;&gt;-->
<!--&lt;!&ndash;            linked subprograms that the work is specifically designed to require,&ndash;&gt;-->
<!--&lt;!&ndash;            such as by intimate data communication or control flow between those&ndash;&gt;-->
<!--&lt;!&ndash;            subprograms and other parts of the work.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The Corresponding Source need not include anything that users&ndash;&gt;-->
<!--&lt;!&ndash;            can regenerate automatically from other parts of the Corresponding&ndash;&gt;-->
<!--&lt;!&ndash;            Source.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The Corresponding Source for a work in source code form is that&ndash;&gt;-->
<!--&lt;!&ndash;            same work.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section2">2. Basic Permissions.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>All rights granted under this License are granted for the term of&ndash;&gt;-->
<!--&lt;!&ndash;            copyright on the Program, and are irrevocable provided the stated&ndash;&gt;-->
<!--&lt;!&ndash;            conditions are met.  This License explicitly affirms your unlimited&ndash;&gt;-->
<!--&lt;!&ndash;            permission to run the unmodified Program.  The output from running a&ndash;&gt;-->
<!--&lt;!&ndash;            covered work is covered by this License only if the output, given its&ndash;&gt;-->
<!--&lt;!&ndash;            content, constitutes a covered work.  This License acknowledges your&ndash;&gt;-->
<!--&lt;!&ndash;            rights of fair use or other equivalent, as provided by copyright law.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may make, run and propagate covered works that you do not&ndash;&gt;-->
<!--&lt;!&ndash;            convey, without conditions so long as your license otherwise remains&ndash;&gt;-->
<!--&lt;!&ndash;            in force.  You may convey covered works to others for the sole purpose&ndash;&gt;-->
<!--&lt;!&ndash;            of having them make modifications exclusively for you, or provide you&ndash;&gt;-->
<!--&lt;!&ndash;            with facilities for running those works, provided that you comply with&ndash;&gt;-->
<!--&lt;!&ndash;            the terms of this License in conveying all material for which you do&ndash;&gt;-->
<!--&lt;!&ndash;            not control copyright.  Those thus making or running the covered works&ndash;&gt;-->
<!--&lt;!&ndash;            for you must do so exclusively on your behalf, under your direction&ndash;&gt;-->
<!--&lt;!&ndash;            and control, on terms that prohibit them from making any copies of&ndash;&gt;-->
<!--&lt;!&ndash;            your copyrighted material outside their relationship with you.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Conveying under any other circumstances is permitted solely under&ndash;&gt;-->
<!--&lt;!&ndash;            the conditions stated below.  Sublicensing is not allowed; section 10&ndash;&gt;-->
<!--&lt;!&ndash;            makes it unnecessary.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section3">3. Protecting Users' Legal Rights From Anti-Circumvention Law.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>No covered work shall be deemed part of an effective technological&ndash;&gt;-->
<!--&lt;!&ndash;            measure under any applicable law fulfilling obligations under article&ndash;&gt;-->
<!--&lt;!&ndash;            11 of the WIPO copyright treaty adopted on 20 December 1996, or&ndash;&gt;-->
<!--&lt;!&ndash;            similar laws prohibiting or restricting circumvention of such&ndash;&gt;-->
<!--&lt;!&ndash;            measures.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>When you convey a covered work, you waive any legal power to forbid&ndash;&gt;-->
<!--&lt;!&ndash;            circumvention of technological measures to the extent such circumvention&ndash;&gt;-->
<!--&lt;!&ndash;            is effected by exercising rights under this License with respect to&ndash;&gt;-->
<!--&lt;!&ndash;            the covered work, and you disclaim any intention to limit operation or&ndash;&gt;-->
<!--&lt;!&ndash;            modification of the work as a means of enforcing, against the work's&ndash;&gt;-->
<!--&lt;!&ndash;            users, your or third parties' legal rights to forbid circumvention of&ndash;&gt;-->
<!--&lt;!&ndash;            technological measures.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section4">4. Conveying Verbatim Copies.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may convey verbatim copies of the Program's source code as you&ndash;&gt;-->
<!--&lt;!&ndash;            receive it, in any medium, provided that you conspicuously and&ndash;&gt;-->
<!--&lt;!&ndash;            appropriately publish on each copy an appropriate copyright notice;&ndash;&gt;-->
<!--&lt;!&ndash;            keep intact all notices stating that this License and any&ndash;&gt;-->
<!--&lt;!&ndash;            non-permissive terms added in accord with section 7 apply to the code;&ndash;&gt;-->
<!--&lt;!&ndash;            keep intact all notices of the absence of any warranty; and give all&ndash;&gt;-->
<!--&lt;!&ndash;            recipients a copy of this License along with the Program.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may charge any price or no price for each copy that you convey,&ndash;&gt;-->
<!--&lt;!&ndash;            and you may offer support or warranty protection for a fee.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section5">5. Conveying Modified Source Versions.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may convey a work based on the Program, or the modifications to&ndash;&gt;-->
<!--&lt;!&ndash;            produce it from the Program, in the form of source code under the&ndash;&gt;-->
<!--&lt;!&ndash;            terms of section 4, provided that you also meet all of these conditions:</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul>&ndash;&gt;-->
<!--&lt;!&ndash;            <li>a) The work must carry prominent notices stating that you modified&ndash;&gt;-->
<!--&lt;!&ndash;              it, and giving a relevant date.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>b) The work must carry prominent notices stating that it is&ndash;&gt;-->
<!--&lt;!&ndash;              released under this License and any conditions added under section&ndash;&gt;-->
<!--&lt;!&ndash;              7.  This requirement modifies the requirement in section 4 to&ndash;&gt;-->
<!--&lt;!&ndash;              “keep intact all notices”.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>c) You must license the entire work, as a whole, under this&ndash;&gt;-->
<!--&lt;!&ndash;              License to anyone who comes into possession of a copy.  This&ndash;&gt;-->
<!--&lt;!&ndash;              License will therefore apply, along with any applicable section 7&ndash;&gt;-->
<!--&lt;!&ndash;              additional terms, to the whole of the work, and all its parts,&ndash;&gt;-->
<!--&lt;!&ndash;              regardless of how they are packaged.  This License gives no&ndash;&gt;-->
<!--&lt;!&ndash;              permission to license the work in any other way, but it does not&ndash;&gt;-->
<!--&lt;!&ndash;              invalidate such permission if you have separately received it.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>d) If the work has interactive user interfaces, each must display&ndash;&gt;-->
<!--&lt;!&ndash;              Appropriate Legal Notices; however, if the Program has interactive&ndash;&gt;-->
<!--&lt;!&ndash;              interfaces that do not display Appropriate Legal Notices, your&ndash;&gt;-->
<!--&lt;!&ndash;              work need not make them do so.</li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A compilation of a covered work with other separate and independent&ndash;&gt;-->
<!--&lt;!&ndash;            works, which are not by their nature extensions of the covered work,&ndash;&gt;-->
<!--&lt;!&ndash;            and which are not combined with it such as to form a larger program,&ndash;&gt;-->
<!--&lt;!&ndash;            in or on a volume of a storage or distribution medium, is called an&ndash;&gt;-->
<!--&lt;!&ndash;            “aggregate” if the compilation and its resulting copyright are not&ndash;&gt;-->
<!--&lt;!&ndash;            used to limit the access or legal rights of the compilation's users&ndash;&gt;-->
<!--&lt;!&ndash;            beyond what the individual works permit.  Inclusion of a covered work&ndash;&gt;-->
<!--&lt;!&ndash;            in an aggregate does not cause this License to apply to the other&ndash;&gt;-->
<!--&lt;!&ndash;            parts of the aggregate.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section6">6. Conveying Non-Source Forms.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may convey a covered work in object code form under the terms&ndash;&gt;-->
<!--&lt;!&ndash;            of sections 4 and 5, provided that you also convey the&ndash;&gt;-->
<!--&lt;!&ndash;            machine-readable Corresponding Source under the terms of this License,&ndash;&gt;-->
<!--&lt;!&ndash;            in one of these ways:</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul>&ndash;&gt;-->
<!--&lt;!&ndash;            <li>a) Convey the object code in, or embodied in, a physical product&ndash;&gt;-->
<!--&lt;!&ndash;              (including a physical distribution medium), accompanied by the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source fixed on a durable physical medium&ndash;&gt;-->
<!--&lt;!&ndash;              customarily used for software interchange.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>b) Convey the object code in, or embodied in, a physical product&ndash;&gt;-->
<!--&lt;!&ndash;              (including a physical distribution medium), accompanied by a&ndash;&gt;-->
<!--&lt;!&ndash;              written offer, valid for at least three years and valid for as&ndash;&gt;-->
<!--&lt;!&ndash;              long as you offer spare parts or customer support for that product&ndash;&gt;-->
<!--&lt;!&ndash;              model, to give anyone who possesses the object code either (1) a&ndash;&gt;-->
<!--&lt;!&ndash;              copy of the Corresponding Source for all the software in the&ndash;&gt;-->
<!--&lt;!&ndash;              product that is covered by this License, on a durable physical&ndash;&gt;-->
<!--&lt;!&ndash;              medium customarily used for software interchange, for a price no&ndash;&gt;-->
<!--&lt;!&ndash;              more than your reasonable cost of physically performing this&ndash;&gt;-->
<!--&lt;!&ndash;              conveying of source, or (2) access to copy the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source from a network server at no charge.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>c) Convey individual copies of the object code with a copy of the&ndash;&gt;-->
<!--&lt;!&ndash;              written offer to provide the Corresponding Source.  This&ndash;&gt;-->
<!--&lt;!&ndash;              alternative is allowed only occasionally and noncommercially, and&ndash;&gt;-->
<!--&lt;!&ndash;              only if you received the object code with such an offer, in accord&ndash;&gt;-->
<!--&lt;!&ndash;              with subsection 6b.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>d) Convey the object code by offering access from a designated&ndash;&gt;-->
<!--&lt;!&ndash;              place (gratis or for a charge), and offer equivalent access to the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source in the same way through the same place at no&ndash;&gt;-->
<!--&lt;!&ndash;              further charge.  You need not require recipients to copy the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source along with the object code.  If the place to&ndash;&gt;-->
<!--&lt;!&ndash;              copy the object code is a network server, the Corresponding Source&ndash;&gt;-->
<!--&lt;!&ndash;              may be on a different server (operated by you or a third party)&ndash;&gt;-->
<!--&lt;!&ndash;              that supports equivalent copying facilities, provided you maintain&ndash;&gt;-->
<!--&lt;!&ndash;              clear directions next to the object code saying where to find the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source.  Regardless of what server hosts the&ndash;&gt;-->
<!--&lt;!&ndash;              Corresponding Source, you remain obligated to ensure that it is&ndash;&gt;-->
<!--&lt;!&ndash;              available for as long as needed to satisfy these requirements.</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>e) Convey the object code using peer-to-peer transmission, provided&ndash;&gt;-->
<!--&lt;!&ndash;              you inform other peers where the object code and Corresponding&ndash;&gt;-->
<!--&lt;!&ndash;              Source of the work are being offered to the general public at no&ndash;&gt;-->
<!--&lt;!&ndash;              charge under subsection 6d.</li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A separable portion of the object code, whose source code is excluded&ndash;&gt;-->
<!--&lt;!&ndash;            from the Corresponding Source as a System Library, need not be&ndash;&gt;-->
<!--&lt;!&ndash;            included in conveying the object code work.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A “User Product” is either (1) a “consumer product”, which means any&ndash;&gt;-->
<!--&lt;!&ndash;            tangible personal property which is normally used for personal, family,&ndash;&gt;-->
<!--&lt;!&ndash;            or household purposes, or (2) anything designed or sold for incorporation&ndash;&gt;-->
<!--&lt;!&ndash;            into a dwelling.  In determining whether a product is a consumer product,&ndash;&gt;-->
<!--&lt;!&ndash;            doubtful cases shall be resolved in favor of coverage.  For a particular&ndash;&gt;-->
<!--&lt;!&ndash;            product received by a particular user, “normally used” refers to a&ndash;&gt;-->
<!--&lt;!&ndash;            typical or common use of that class of product, regardless of the status&ndash;&gt;-->
<!--&lt;!&ndash;            of the particular user or of the way in which the particular user&ndash;&gt;-->
<!--&lt;!&ndash;            actually uses, or expects or is expected to use, the product.  A product&ndash;&gt;-->
<!--&lt;!&ndash;            is a consumer product regardless of whether the product has substantial&ndash;&gt;-->
<!--&lt;!&ndash;            commercial, industrial or non-consumer uses, unless such uses represent&ndash;&gt;-->
<!--&lt;!&ndash;            the only significant mode of use of the product.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>“Installation Information” for a User Product means any methods,&ndash;&gt;-->
<!--&lt;!&ndash;            procedures, authorization keys, or other information required to install&ndash;&gt;-->
<!--&lt;!&ndash;            and execute modified versions of a covered work in that User Product from&ndash;&gt;-->
<!--&lt;!&ndash;            a modified version of its Corresponding Source.  The information must&ndash;&gt;-->
<!--&lt;!&ndash;            suffice to ensure that the continued functioning of the modified object&ndash;&gt;-->
<!--&lt;!&ndash;            code is in no case prevented or interfered with solely because&ndash;&gt;-->
<!--&lt;!&ndash;            modification has been made.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If you convey an object code work under this section in, or with, or&ndash;&gt;-->
<!--&lt;!&ndash;            specifically for use in, a User Product, and the conveying occurs as&ndash;&gt;-->
<!--&lt;!&ndash;            part of a transaction in which the right of possession and use of the&ndash;&gt;-->
<!--&lt;!&ndash;            User Product is transferred to the recipient in perpetuity or for a&ndash;&gt;-->
<!--&lt;!&ndash;            fixed term (regardless of how the transaction is characterized), the&ndash;&gt;-->
<!--&lt;!&ndash;            Corresponding Source conveyed under this section must be accompanied&ndash;&gt;-->
<!--&lt;!&ndash;            by the Installation Information.  But this requirement does not apply&ndash;&gt;-->
<!--&lt;!&ndash;            if neither you nor any third party retains the ability to install&ndash;&gt;-->
<!--&lt;!&ndash;            modified object code on the User Product (for example, the work has&ndash;&gt;-->
<!--&lt;!&ndash;            been installed in ROM).</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The requirement to provide Installation Information does not include a&ndash;&gt;-->
<!--&lt;!&ndash;            requirement to continue to provide support service, warranty, or updates&ndash;&gt;-->
<!--&lt;!&ndash;            for a work that has been modified or installed by the recipient, or for&ndash;&gt;-->
<!--&lt;!&ndash;            the User Product in which it has been modified or installed.  Access to a&ndash;&gt;-->
<!--&lt;!&ndash;            network may be denied when the modification itself materially and&ndash;&gt;-->
<!--&lt;!&ndash;            adversely affects the operation of the network or violates the rules and&ndash;&gt;-->
<!--&lt;!&ndash;            protocols for communication across the network.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Corresponding Source conveyed, and Installation Information provided,&ndash;&gt;-->
<!--&lt;!&ndash;            in accord with this section must be in a format that is publicly&ndash;&gt;-->
<!--&lt;!&ndash;            documented (and with an implementation available to the public in&ndash;&gt;-->
<!--&lt;!&ndash;            source code form), and must require no special password or key for&ndash;&gt;-->
<!--&lt;!&ndash;            unpacking, reading or copying.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section7">7. Additional Terms.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>“Additional permissions” are terms that supplement the terms of this&ndash;&gt;-->
<!--&lt;!&ndash;            License by making exceptions from one or more of its conditions.&ndash;&gt;-->
<!--&lt;!&ndash;            Additional permissions that are applicable to the entire Program shall&ndash;&gt;-->
<!--&lt;!&ndash;            be treated as though they were included in this License, to the extent&ndash;&gt;-->
<!--&lt;!&ndash;            that they are valid under applicable law.  If additional permissions&ndash;&gt;-->
<!--&lt;!&ndash;            apply only to part of the Program, that part may be used separately&ndash;&gt;-->
<!--&lt;!&ndash;            under those permissions, but the entire Program remains governed by&ndash;&gt;-->
<!--&lt;!&ndash;            this License without regard to the additional permissions.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>When you convey a copy of a covered work, you may at your option&ndash;&gt;-->
<!--&lt;!&ndash;            remove any additional permissions from that copy, or from any part of&ndash;&gt;-->
<!--&lt;!&ndash;            it.  (Additional permissions may be written to require their own&ndash;&gt;-->
<!--&lt;!&ndash;            removal in certain cases when you modify the work.)  You may place&ndash;&gt;-->
<!--&lt;!&ndash;            additional permissions on material, added by you to a covered work,&ndash;&gt;-->
<!--&lt;!&ndash;            for which you have or can give appropriate copyright permission.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Notwithstanding any other provision of this License, for material you&ndash;&gt;-->
<!--&lt;!&ndash;            add to a covered work, you may (if authorized by the copyright holders of&ndash;&gt;-->
<!--&lt;!&ndash;            that material) supplement the terms of this License with terms:</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul>&ndash;&gt;-->
<!--&lt;!&ndash;            <li>a) Disclaiming warranty or limiting liability differently from the&ndash;&gt;-->
<!--&lt;!&ndash;              terms of sections 15 and 16 of this License; or</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>b) Requiring preservation of specified reasonable legal notices or&ndash;&gt;-->
<!--&lt;!&ndash;              author attributions in that material or in the Appropriate Legal&ndash;&gt;-->
<!--&lt;!&ndash;              Notices displayed by works containing it; or</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>c) Prohibiting misrepresentation of the origin of that material, or&ndash;&gt;-->
<!--&lt;!&ndash;              requiring that modified versions of such material be marked in&ndash;&gt;-->
<!--&lt;!&ndash;              reasonable ways as different from the original version; or</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>d) Limiting the use for publicity purposes of names of licensors or&ndash;&gt;-->
<!--&lt;!&ndash;              authors of the material; or</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>e) Declining to grant rights under trademark law for use of some&ndash;&gt;-->
<!--&lt;!&ndash;              trade names, trademarks, or service marks; or</li>&ndash;&gt;-->

<!--&lt;!&ndash;            <li>f) Requiring indemnification of licensors and authors of that&ndash;&gt;-->
<!--&lt;!&ndash;              material by anyone who conveys the material (or modified versions of&ndash;&gt;-->
<!--&lt;!&ndash;              it) with contractual assumptions of liability to the recipient, for&ndash;&gt;-->
<!--&lt;!&ndash;              any liability that these contractual assumptions directly impose on&ndash;&gt;-->
<!--&lt;!&ndash;              those licensors and authors.</li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>All other non-permissive additional terms are considered “further&ndash;&gt;-->
<!--&lt;!&ndash;            restrictions” within the meaning of section 10.  If the Program as you&ndash;&gt;-->
<!--&lt;!&ndash;            received it, or any part of it, contains a notice stating that it is&ndash;&gt;-->
<!--&lt;!&ndash;            governed by this License along with a term that is a further&ndash;&gt;-->
<!--&lt;!&ndash;            restriction, you may remove that term.  If a license document contains&ndash;&gt;-->
<!--&lt;!&ndash;            a further restriction but permits relicensing or conveying under this&ndash;&gt;-->
<!--&lt;!&ndash;            License, you may add to a covered work material governed by the terms&ndash;&gt;-->
<!--&lt;!&ndash;            of that license document, provided that the further restriction does&ndash;&gt;-->
<!--&lt;!&ndash;            not survive such relicensing or conveying.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If you add terms to a covered work in accord with this section, you&ndash;&gt;-->
<!--&lt;!&ndash;            must place, in the relevant source files, a statement of the&ndash;&gt;-->
<!--&lt;!&ndash;            additional terms that apply to those files, or a notice indicating&ndash;&gt;-->
<!--&lt;!&ndash;            where to find the applicable terms.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Additional terms, permissive or non-permissive, may be stated in the&ndash;&gt;-->
<!--&lt;!&ndash;            form of a separately written license, or stated as exceptions;&ndash;&gt;-->
<!--&lt;!&ndash;            the above requirements apply either way.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section8">8. Termination.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may not propagate or modify a covered work except as expressly&ndash;&gt;-->
<!--&lt;!&ndash;            provided under this License.  Any attempt otherwise to propagate or&ndash;&gt;-->
<!--&lt;!&ndash;            modify it is void, and will automatically terminate your rights under&ndash;&gt;-->
<!--&lt;!&ndash;            this License (including any patent licenses granted under the third&ndash;&gt;-->
<!--&lt;!&ndash;            paragraph of section 11).</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>However, if you cease all violation of this License, then your&ndash;&gt;-->
<!--&lt;!&ndash;            license from a particular copyright holder is reinstated (a)&ndash;&gt;-->
<!--&lt;!&ndash;            provisionally, unless and until the copyright holder explicitly and&ndash;&gt;-->
<!--&lt;!&ndash;            finally terminates your license, and (b) permanently, if the copyright&ndash;&gt;-->
<!--&lt;!&ndash;            holder fails to notify you of the violation by some reasonable means&ndash;&gt;-->
<!--&lt;!&ndash;            prior to 60 days after the cessation.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Moreover, your license from a particular copyright holder is&ndash;&gt;-->
<!--&lt;!&ndash;            reinstated permanently if the copyright holder notifies you of the&ndash;&gt;-->
<!--&lt;!&ndash;            violation by some reasonable means, this is the first time you have&ndash;&gt;-->
<!--&lt;!&ndash;            received notice of violation of this License (for any work) from that&ndash;&gt;-->
<!--&lt;!&ndash;            copyright holder, and you cure the violation prior to 30 days after&ndash;&gt;-->
<!--&lt;!&ndash;            your receipt of the notice.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Termination of your rights under this section does not terminate the&ndash;&gt;-->
<!--&lt;!&ndash;            licenses of parties who have received copies or rights from you under&ndash;&gt;-->
<!--&lt;!&ndash;            this License.  If your rights have been terminated and not permanently&ndash;&gt;-->
<!--&lt;!&ndash;            reinstated, you do not qualify to receive new licenses for the same&ndash;&gt;-->
<!--&lt;!&ndash;            material under section 10.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section9">9. Acceptance Not Required for Having Copies.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You are not required to accept this License in order to receive or&ndash;&gt;-->
<!--&lt;!&ndash;            run a copy of the Program.  Ancillary propagation of a covered work&ndash;&gt;-->
<!--&lt;!&ndash;            occurring solely as a consequence of using peer-to-peer transmission&ndash;&gt;-->
<!--&lt;!&ndash;            to receive a copy likewise does not require acceptance.  However,&ndash;&gt;-->
<!--&lt;!&ndash;            nothing other than this License grants you permission to propagate or&ndash;&gt;-->
<!--&lt;!&ndash;            modify any covered work.  These actions infringe copyright if you do&ndash;&gt;-->
<!--&lt;!&ndash;            not accept this License.  Therefore, by modifying or propagating a&ndash;&gt;-->
<!--&lt;!&ndash;            covered work, you indicate your acceptance of this License to do so.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section10">10. Automatic Licensing of Downstream Recipients.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Each time you convey a covered work, the recipient automatically&ndash;&gt;-->
<!--&lt;!&ndash;            receives a license from the original licensors, to run, modify and&ndash;&gt;-->
<!--&lt;!&ndash;            propagate that work, subject to this License.  You are not responsible&ndash;&gt;-->
<!--&lt;!&ndash;            for enforcing compliance by third parties with this License.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>An “entity transaction” is a transaction transferring control of an&ndash;&gt;-->
<!--&lt;!&ndash;            organization, or substantially all assets of one, or subdividing an&ndash;&gt;-->
<!--&lt;!&ndash;            organization, or merging organizations.  If propagation of a covered&ndash;&gt;-->
<!--&lt;!&ndash;            work results from an entity transaction, each party to that&ndash;&gt;-->
<!--&lt;!&ndash;            transaction who receives a copy of the work also receives whatever&ndash;&gt;-->
<!--&lt;!&ndash;            licenses to the work the party's predecessor in interest had or could&ndash;&gt;-->
<!--&lt;!&ndash;            give under the previous paragraph, plus a right to possession of the&ndash;&gt;-->
<!--&lt;!&ndash;            Corresponding Source of the work from the predecessor in interest, if&ndash;&gt;-->
<!--&lt;!&ndash;            the predecessor has it or can get it with reasonable efforts.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You may not impose any further restrictions on the exercise of the&ndash;&gt;-->
<!--&lt;!&ndash;            rights granted or affirmed under this License.  For example, you may&ndash;&gt;-->
<!--&lt;!&ndash;            not impose a license fee, royalty, or other charge for exercise of&ndash;&gt;-->
<!--&lt;!&ndash;            rights granted under this License, and you may not initiate litigation&ndash;&gt;-->
<!--&lt;!&ndash;            (including a cross-claim or counterclaim in a lawsuit) alleging that&ndash;&gt;-->
<!--&lt;!&ndash;            any patent claim is infringed by making, using, selling, offering for&ndash;&gt;-->
<!--&lt;!&ndash;            sale, or importing the Program or any portion of it.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section11">11. Patents.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A “contributor” is a copyright holder who authorizes use under this&ndash;&gt;-->
<!--&lt;!&ndash;            License of the Program or a work on which the Program is based.  The&ndash;&gt;-->
<!--&lt;!&ndash;            work thus licensed is called the contributor's “contributor version”.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A contributor's “essential patent claims” are all patent claims&ndash;&gt;-->
<!--&lt;!&ndash;            owned or controlled by the contributor, whether already acquired or&ndash;&gt;-->
<!--&lt;!&ndash;            hereafter acquired, that would be infringed by some manner, permitted&ndash;&gt;-->
<!--&lt;!&ndash;            by this License, of making, using, or selling its contributor version,&ndash;&gt;-->
<!--&lt;!&ndash;            but do not include claims that would be infringed only as a&ndash;&gt;-->
<!--&lt;!&ndash;            consequence of further modification of the contributor version.  For&ndash;&gt;-->
<!--&lt;!&ndash;            purposes of this definition, “control” includes the right to grant&ndash;&gt;-->
<!--&lt;!&ndash;            patent sublicenses in a manner consistent with the requirements of&ndash;&gt;-->
<!--&lt;!&ndash;            this License.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Each contributor grants you a non-exclusive, worldwide, royalty-free&ndash;&gt;-->
<!--&lt;!&ndash;            patent license under the contributor's essential patent claims, to&ndash;&gt;-->
<!--&lt;!&ndash;            make, use, sell, offer for sale, import and otherwise run, modify and&ndash;&gt;-->
<!--&lt;!&ndash;            propagate the contents of its contributor version.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>In the following three paragraphs, a “patent license” is any express&ndash;&gt;-->
<!--&lt;!&ndash;            agreement or commitment, however denominated, not to enforce a patent&ndash;&gt;-->
<!--&lt;!&ndash;            (such as an express permission to practice a patent or covenant not to&ndash;&gt;-->
<!--&lt;!&ndash;            sue for patent infringement).  To “grant” such a patent license to a&ndash;&gt;-->
<!--&lt;!&ndash;            party means to make such an agreement or commitment not to enforce a&ndash;&gt;-->
<!--&lt;!&ndash;            patent against the party.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If you convey a covered work, knowingly relying on a patent license,&ndash;&gt;-->
<!--&lt;!&ndash;            and the Corresponding Source of the work is not available for anyone&ndash;&gt;-->
<!--&lt;!&ndash;            to copy, free of charge and under the terms of this License, through a&ndash;&gt;-->
<!--&lt;!&ndash;            publicly available network server or other readily accessible means,&ndash;&gt;-->
<!--&lt;!&ndash;            then you must either (1) cause the Corresponding Source to be so&ndash;&gt;-->
<!--&lt;!&ndash;            available, or (2) arrange to deprive yourself of the benefit of the&ndash;&gt;-->
<!--&lt;!&ndash;            patent license for this particular work, or (3) arrange, in a manner&ndash;&gt;-->
<!--&lt;!&ndash;            consistent with the requirements of this License, to extend the patent&ndash;&gt;-->
<!--&lt;!&ndash;            license to downstream recipients.  “Knowingly relying” means you have&ndash;&gt;-->
<!--&lt;!&ndash;            actual knowledge that, but for the patent license, your conveying the&ndash;&gt;-->
<!--&lt;!&ndash;            covered work in a country, or your recipient's use of the covered work&ndash;&gt;-->
<!--&lt;!&ndash;            in a country, would infringe one or more identifiable patents in that&ndash;&gt;-->
<!--&lt;!&ndash;            country that you have reason to believe are valid.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If, pursuant to or in connection with a single transaction or&ndash;&gt;-->
<!--&lt;!&ndash;            arrangement, you convey, or propagate by procuring conveyance of, a&ndash;&gt;-->
<!--&lt;!&ndash;            covered work, and grant a patent license to some of the parties&ndash;&gt;-->
<!--&lt;!&ndash;            receiving the covered work authorizing them to use, propagate, modify&ndash;&gt;-->
<!--&lt;!&ndash;            or convey a specific copy of the covered work, then the patent license&ndash;&gt;-->
<!--&lt;!&ndash;            you grant is automatically extended to all recipients of the covered&ndash;&gt;-->
<!--&lt;!&ndash;            work and works based on it.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>A patent license is “discriminatory” if it does not include within&ndash;&gt;-->
<!--&lt;!&ndash;            the scope of its coverage, prohibits the exercise of, or is&ndash;&gt;-->
<!--&lt;!&ndash;            conditioned on the non-exercise of one or more of the rights that are&ndash;&gt;-->
<!--&lt;!&ndash;            specifically granted under this License.  You may not convey a covered&ndash;&gt;-->
<!--&lt;!&ndash;            work if you are a party to an arrangement with a third party that is&ndash;&gt;-->
<!--&lt;!&ndash;            in the business of distributing software, under which you make payment&ndash;&gt;-->
<!--&lt;!&ndash;            to the third party based on the extent of your activity of conveying&ndash;&gt;-->
<!--&lt;!&ndash;            the work, and under which the third party grants, to any of the&ndash;&gt;-->
<!--&lt;!&ndash;            parties who would receive the covered work from you, a discriminatory&ndash;&gt;-->
<!--&lt;!&ndash;            patent license (a) in connection with copies of the covered work&ndash;&gt;-->
<!--&lt;!&ndash;            conveyed by you (or copies made from those copies), or (b) primarily&ndash;&gt;-->
<!--&lt;!&ndash;            for and in connection with specific products or compilations that&ndash;&gt;-->
<!--&lt;!&ndash;            contain the covered work, unless you entered into that arrangement,&ndash;&gt;-->
<!--&lt;!&ndash;            or that patent license was granted, prior to 28 March 2007.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Nothing in this License shall be construed as excluding or limiting&ndash;&gt;-->
<!--&lt;!&ndash;            any implied license or other defenses to infringement that may&ndash;&gt;-->
<!--&lt;!&ndash;            otherwise be available to you under applicable patent law.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section12">12. No Surrender of Others' Freedom.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If conditions are imposed on you (whether by court order, agreement or&ndash;&gt;-->
<!--&lt;!&ndash;            otherwise) that contradict the conditions of this License, they do not&ndash;&gt;-->
<!--&lt;!&ndash;            excuse you from the conditions of this License.  If you cannot convey a&ndash;&gt;-->
<!--&lt;!&ndash;            covered work so as to satisfy simultaneously your obligations under this&ndash;&gt;-->
<!--&lt;!&ndash;            License and any other pertinent obligations, then as a consequence you may&ndash;&gt;-->
<!--&lt;!&ndash;            not convey it at all.  For example, if you agree to terms that obligate you&ndash;&gt;-->
<!--&lt;!&ndash;            to collect a royalty for further conveying from those to whom you convey&ndash;&gt;-->
<!--&lt;!&ndash;            the Program, the only way you could satisfy both those terms and this&ndash;&gt;-->
<!--&lt;!&ndash;            License would be to refrain entirely from conveying the Program.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section13">13. Use with the GNU Affero General Public License.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Notwithstanding any other provision of this License, you have&ndash;&gt;-->
<!--&lt;!&ndash;            permission to link or combine any covered work with a work licensed&ndash;&gt;-->
<!--&lt;!&ndash;            under version 3 of the GNU Affero General Public License into a single&ndash;&gt;-->
<!--&lt;!&ndash;            combined work, and to convey the resulting work.  The terms of this&ndash;&gt;-->
<!--&lt;!&ndash;            License will continue to apply to the part which is the covered work,&ndash;&gt;-->
<!--&lt;!&ndash;            but the special requirements of the GNU Affero General Public License,&ndash;&gt;-->
<!--&lt;!&ndash;            section 13, concerning interaction through a network will apply to the&ndash;&gt;-->
<!--&lt;!&ndash;            combination as such.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section14">14. Revised Versions of this License.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The Free Software Foundation may publish revised and/or new versions of&ndash;&gt;-->
<!--&lt;!&ndash;            the GNU General Public License from time to time.  Such new versions will&ndash;&gt;-->
<!--&lt;!&ndash;            be similar in spirit to the present version, but may differ in detail to&ndash;&gt;-->
<!--&lt;!&ndash;            address new problems or concerns.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Each version is given a distinguishing version number.  If the&ndash;&gt;-->
<!--&lt;!&ndash;            Program specifies that a certain numbered version of the GNU General&ndash;&gt;-->
<!--&lt;!&ndash;            Public License “or any later version” applies to it, you have the&ndash;&gt;-->
<!--&lt;!&ndash;            option of following the terms and conditions either of that numbered&ndash;&gt;-->
<!--&lt;!&ndash;            version or of any later version published by the Free Software&ndash;&gt;-->
<!--&lt;!&ndash;            Foundation.  If the Program does not specify a version number of the&ndash;&gt;-->
<!--&lt;!&ndash;            GNU General Public License, you may choose any version ever published&ndash;&gt;-->
<!--&lt;!&ndash;            by the Free Software Foundation.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If the Program specifies that a proxy can decide which future&ndash;&gt;-->
<!--&lt;!&ndash;            versions of the GNU General Public License can be used, that proxy's&ndash;&gt;-->
<!--&lt;!&ndash;            public statement of acceptance of a version permanently authorizes you&ndash;&gt;-->
<!--&lt;!&ndash;            to choose that version for the Program.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Later license versions may give you additional or different&ndash;&gt;-->
<!--&lt;!&ndash;            permissions.  However, no additional obligations are imposed on any&ndash;&gt;-->
<!--&lt;!&ndash;            author or copyright holder as a result of your choosing to follow a&ndash;&gt;-->
<!--&lt;!&ndash;            later version.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section15">15. Disclaimer of Warranty.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY&ndash;&gt;-->
<!--&lt;!&ndash;            APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT&ndash;&gt;-->
<!--&lt;!&ndash;            HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY&ndash;&gt;-->
<!--&lt;!&ndash;            OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,&ndash;&gt;-->
<!--&lt;!&ndash;            THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR&ndash;&gt;-->
<!--&lt;!&ndash;            PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM&ndash;&gt;-->
<!--&lt;!&ndash;            IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF&ndash;&gt;-->
<!--&lt;!&ndash;            ALL NECESSARY SERVICING, REPAIR OR CORRECTION.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section16">16. Limitation of Liability.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING&ndash;&gt;-->
<!--&lt;!&ndash;            WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS&ndash;&gt;-->
<!--&lt;!&ndash;            THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY&ndash;&gt;-->
<!--&lt;!&ndash;            GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE&ndash;&gt;-->
<!--&lt;!&ndash;            USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF&ndash;&gt;-->
<!--&lt;!&ndash;            DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD&ndash;&gt;-->
<!--&lt;!&ndash;            PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),&ndash;&gt;-->
<!--&lt;!&ndash;            EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF&ndash;&gt;-->
<!--&lt;!&ndash;            SUCH DAMAGES.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h5 id="section17">17. Interpretation of Sections 15 and 16.</h5>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If the disclaimer of warranty and limitation of liability provided&ndash;&gt;-->
<!--&lt;!&ndash;            above cannot be given local legal effect according to their terms,&ndash;&gt;-->
<!--&lt;!&ndash;            reviewing courts shall apply local law that most closely approximates&ndash;&gt;-->
<!--&lt;!&ndash;            an absolute waiver of all civil liability in connection with the&ndash;&gt;-->
<!--&lt;!&ndash;            Program, unless a warranty or assumption of liability accompanies a&ndash;&gt;-->
<!--&lt;!&ndash;            copy of the Program in return for a fee.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>END OF TERMS AND CONDITIONS</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <h4 id="howto">How to Apply These Terms to Your New Programs</h4>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If you develop a new program, and you want it to be of the greatest&ndash;&gt;-->
<!--&lt;!&ndash;            possible use to the public, the best way to achieve this is to make it&ndash;&gt;-->
<!--&lt;!&ndash;            free software which everyone can redistribute and change under these terms.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>To do so, attach the following notices to the program.  It is safest&ndash;&gt;-->
<!--&lt;!&ndash;            to attach them to the start of each source file to most effectively&ndash;&gt;-->
<!--&lt;!&ndash;            state the exclusion of warranty; and each file should have at least&ndash;&gt;-->
<!--&lt;!&ndash;            the “copyright” line and a pointer to where the full notice is found.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <pre>    &lt;one line to give the program's name and a brief idea of what it does.&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    Copyright (C) &lt;year&gt;  &lt;name of author&gt;&ndash;&gt;-->

<!--&lt;!&ndash;    This program is free software: you can redistribute it and/or modify&ndash;&gt;-->
<!--&lt;!&ndash;    it under the terms of the GNU General Public License as published by&ndash;&gt;-->
<!--&lt;!&ndash;    the Free Software Foundation, either version 3 of the License, or&ndash;&gt;-->
<!--&lt;!&ndash;    (at your option) any later version.&ndash;&gt;-->

<!--&lt;!&ndash;    This program is distributed in the hope that it will be useful,&ndash;&gt;-->
<!--&lt;!&ndash;    but WITHOUT ANY WARRANTY; without even the implied warranty of&ndash;&gt;-->
<!--&lt;!&ndash;    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the&ndash;&gt;-->
<!--&lt;!&ndash;    GNU General Public License for more details.&ndash;&gt;-->

<!--&lt;!&ndash;    You should have received a copy of the GNU General Public License&ndash;&gt;-->
<!--&lt;!&ndash;    along with this program.  If not, see &lt;https://www.gnu.org/licenses/&gt;.&ndash;&gt;-->
<!--&lt;!&ndash;</pre>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>Also add information on how to contact you by electronic and paper mail.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>If the program does terminal interaction, make it output a short&ndash;&gt;-->
<!--&lt;!&ndash;            notice like this when it starts in an interactive mode:</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <pre>    &lt;program&gt;  Copyright (C) &lt;year&gt;  &lt;name of author&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.&ndash;&gt;-->
<!--&lt;!&ndash;    This is free software, and you are welcome to redistribute it&ndash;&gt;-->
<!--&lt;!&ndash;    under certain conditions; type `show c' for details.&ndash;&gt;-->
<!--&lt;!&ndash;</pre>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The hypothetical commands `show w' and `show c' should show the appropriate&ndash;&gt;-->
<!--&lt;!&ndash;            parts of the General Public License.  Of course, your program's commands&ndash;&gt;-->
<!--&lt;!&ndash;            might be different; for a GUI interface, you would use an “about box”.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>You should also get your employer (if you work as a programmer) or school,&ndash;&gt;-->
<!--&lt;!&ndash;            if any, to sign a “copyright disclaimer” for the program, if necessary.&ndash;&gt;-->
<!--&lt;!&ndash;            For more information on this, and how to apply and follow the GNU GPL, see&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;<a href="https://www.gnu.org/licenses/">https://www.gnu.org/licenses/</a>&gt;.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <p>The GNU General Public License does not permit incorporating your program&ndash;&gt;-->
<!--&lt;!&ndash;            into proprietary programs.  If your program is a subroutine library, you&ndash;&gt;-->
<!--&lt;!&ndash;            may consider it more useful to permit linking proprietary applications with&ndash;&gt;-->
<!--&lt;!&ndash;            the library.  If this is what you want to do, use the GNU Lesser General&ndash;&gt;-->
<!--&lt;!&ndash;            Public License instead of this License.  But first, please read&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;<a href="https://www.gnu.org/licenses/why-not-lgpl.html">https://www.gnu.org/licenses/why-not-lgpl.html</a>&gt;.</p>&ndash;&gt;-->

<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-collapse-item>-->

<!--    <el-collapse-item title="引用信息" class="LayoutCenter-Frame" style="animation-delay: .6s">-->

<!--    </el-collapse-item>-->
<!--  </el-collapse>-->
</template>

<script setup>
import { ref } from 'vue'
import { formatDateDistance } from '../../plugins/addon/utils.ts'

const projectsRequire = ref([
  {
    name: "Vue.js 3.0",
    url: "https://cn.vuejs.org/",
    desc: "渐进式 JavaScript 框架",
    agreement: {
      name: "MIT license",
      url: "https://github.com/vuejs/core/blob/main/LICENSE"
    },
    time: 1662516511000
  },
  {
    name: "vue-axios ^3.4.1",
    url: "https://cn.vuejs.org/",
    desc: "A small wrapper for integrating axios to Vuejs",
    agreement: {
      name: "MIT license",
      url: "https://github.com/imcvampire/vue-axios/blob/master/LICENSE"
    },
    time: 1662516511000
  },
  {
    "desc": "🍡 An interactive and responsive charting library",
    "url": "https://github.com/antvis/G2plot",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/antvis/G2Plot/blob/master/LICENSE"
    },
    "time": 1662521430311,
    "name": "@antv/g2plot"
  },
  {
    "desc": "Main package for storing Element Plus icon resources.",
    "url": "https://github.com/element-plus/element-plus-icons",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/element-plus/element-plus-icons/blob/main/LICENSE"
    },
    "time": 1662521432204,
    "name": "@element-plus/icons-vue"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/axios/axios",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/axios/axios/blob/v1.x/LICENSE"
    },
    "time": 1662521434376,
    "name": "axios"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/highlightjs/highlight.js",
    "agreement": {
      "name": "BSD-3-Clause license",
      "url": "https://github.com/highlightjs/highlight.js/blob/main/LICENSE"
    },
    "time": 1662521442257,
    "name": "element-plus"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/lodash/lodash",
    "agreement": {
      "name": "View license",
      "url": "https://github.com/lodash/lodash/blob/master/LICENSE"
    },
    "time": 1662521444396,
    "name": "highlight.js"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/airbnb/lottie-web",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/airbnb/lottie-web/blob/master/LICENSE.md"
    },
    "time": 1662521446653,
    "name": "lodash"
  },
  {
    "desc": "a JavaScript function for hashing messages with MD5",
    "url": "https://github.com/pvorb/node-md5",
    "agreement": {
      "name": "BSD-3-Clause license",
      "url": "https://github.com/pvorb/node-md5/blob/master/LICENSE"
    },
    "time": 1662521448305,
    "name": "lottie-web"
  },
  {
    "desc": "Parse, validate, manipulate, and display dates in javascript.",
    "url": "https://github.com/moment/moment",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/moment/moment/blob/develop/LICENSE"
    },
    "time": 1662521450368,
    "name": "md5"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/rstacruz/nprogress",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/rstacruz/nprogress/blob/master/License.md"
    },
    "time": 1662521454270,
    "name": "node"
  },
  {
    "desc": "🍍 Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support",
    "url": "https://github.com/vuejs/pinia",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/vuejs/pinia/blob/v2/LICENSE"
    },
    "time": 1662521458397,
    "name": "path"
  },
  {
    "desc": "Persist pinia state data in sessionStorage or other storages.",
    "url": "https://github.com/Seb-L/pinia-plugin-persist",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/Seb-L/pinia-plugin-persist/blob/main/LICENSE"
    },
    "time": 1662521460328,
    "name": "pinia"
  },
  {
    "desc": "The reference implementation of Sass, written in Dart.",
    "url": "https://github.com/sass/dart-sass",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/sass/dart-sass/blob/main/LICENSE"
    },
    "time": 1662521462799,
    "name": "pinia-plugin-persist"
  },
  {
    "desc": "JavaScript 3D Library.",
    "url": "https://github.com/mrdoob/three.js",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/mrdoob/three.js/blob/dev/LICENSE"
    },
    "time": 1662521464317,
    "name": "sass"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/justintaddei/v-wave",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/justintaddei/v-wave/blob/master/LICENSE.md"
    },
    "time": 1662521468328,
    "name": "ts-md5"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/Vanessa219/vditor",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/Vanessa219/vditor/blob/master/LICENSE"
    },
    "time": 1662521470482,
    "name": "v-wave"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/vuejs/core",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/vuejs/core/blob/main/LICENSE"
    },
    "time": 1662521472293,
    "name": "vditor"
  }
])

</script>

<script>
export default {
  name: "About"
}
</script>

<style lang="scss" scoped>
.el-tabs {
  //position: relative;
  //margin-top: 50px;

  //left: 20%;
  //width: 60%;
  height: 100%;
}

:deep(.el-collapse-item__header) {
  &:before {
    content: "";
    position: absolute;

    width: 3px;
    height: 100%;

    opacity: .75;
    border-radius: 5px;
    background-color: var(--el-color-primary-light-3);
  }
  position: relative;

  height: 30px;

  text-indent: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  //border-left: 3px solid var(--el-color-primary-light-3);
  border-bottom: none !important;
}

</style>
