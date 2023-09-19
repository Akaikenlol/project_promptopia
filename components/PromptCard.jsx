"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

//Make sure to fix this things!!!
// Error might be from sending req to mongo for user.

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const [copied, setCopied] = useState("");

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(""), 3000);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
					{post.creator?.image ? (
						<Image
							src={post.creator?.image}
							alt="user_image"
							width={40}
							height={40}
							className="rounded-full object-contain"
						/>
					) : (
						<Image
							src="https://i.pinimg.com/564x/74/09/ae/7409aeea01bd2475f0b2dc1d4e35486e.jpg"
							alt="user_image"
							width={40}
							height={40}
							className="rounded-full object-contain"
						/>
					)}
					<div className="flex flex-col">
						<h3 className="font-semibold font-satoshi text-gray-900">
							{post.creator?.username ? post.creator?.username : "John Doe"}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator?.email
								? post.creator?.email
								: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? "assets/icons/tick.svg"
								: "assets/icons/copy.svg"
						}
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>
		</div>
	);
};

export default PromptCard;
